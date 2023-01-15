# 3Dアプリの開発

**要約：Zwin上では、Zwinプロトコルをサポートする3Dのクライアントアプリの修正・再ビルド・実行をVR内で完結して行えます。**

このチュートリアルは[インストール](/ja/getting_started/installation)の手順を完了した人を対象としています。

## 注意
Beta版のZwinはまだ不完全で、このドキュメントに関連する以下の注意点があります。

- Waylandクライアント以外の2Dアプリが動きません。
  - 特にVSCodeなどのアプリが動きません。
  - 代わりに、**VimやnanoなどCUIのエディタを使ってください**。

- Waylandクライアントの一部の機能が動きません。
  - **右クリックした時のポップアップウィンドウが開かないなどの不良があります**。

- コピーアンドペーストやドラッグアンドドロップの機能が動きません。
  - **このドキュメント上のコマンドなどはキーボードで入力する必要があります**。

これらは近い将来サポートする予定なので、興味があればぜひ開発に参加してください。

## 目的
このチュートリアルでは、Zwinプロトコルをサポートする3Dのクライアントアプリを修正して実行することで、**Zwin上でどのように3Dのアプリを開発していけるのか**、を知ることを目的にします。

このチュートリアルは、**0から3Dのアプリを作ることを目的としません。**
代わりに既にあるリソースに修正を加えて、どのように変更が反映されるのかを学んでもらいます。
0から3Dアプリを作るチュートリアルも今後準備しますので少々お待ちください！
更新は[Twitter](https://twitter.com/zigen_project)で見れます。

Zwinでは、あなたは空間全体を占有する"Big App"を作る代わりに、空間の一部を占有する**小さな**アプリを作ることができます。小さいので、少数の機能だけにフォーカスできます。

ZwinではOpenGL ESライクな比較的低いレイヤのプロトコルを通して3Dアプリを作ることができます。アプリの描画についての詳細は、[レンダリング方式](/ja/what_is_it/rendering_scheme)を参照してください。

ここでは、簡単なクライアントライブラリである[Zukou](https://github.com/zwin-project/zukou)を使ったアプリを作ります。

## ドキュメントをブラウザで開く
Zenはデスクトップ環境なので、ブラウザを開くことができます。
例えば[Google Chrome](https://www.google.com/chrome/)をインストールしている方は、以下のように、ランチャーのアイコンとしてChromeを追加してみてください。
```:~/.config/zen-desktop/config.toml
.
.

[[favorite_apps]]
name = "Google Chrome"
exec = "google-chrome 'https://google.com' --enable-features=UseOzonePlatform --ozone-platform=wayland --window-size=1000,800 --disable-gpu" # required
icon = "/path/to/icon" # svg / png / gltf

.
.
```

ランチャーのGoogle Chromeのアイコンをクリックすればブラウザが開きます。
ブラウザでこのドキュメントを開けば、VR空間から抜けずに、ドキュメントを見ながら作業できます！

![3d ランチャーでこのページを開くGIF](image1.png "image_tooltip")

## ビルドとインストール
まずビルドやインストール、コードの編集などの作業をするためのターミナルを開きましょう。

もしターミナルのアイコンがなければ、アイコンをセットアップしましょう。例えば以下です。
```:~/.config/zen-desktop/config.toml
.
.

[[favorite_apps]]
name = "Terminal"
exec = "weston-terminal" # required
icon = "/path/to/icon" # svg / png / gltf

.
.
```
この設定を保存して、Zenを起動すれば、ターミナルのアイコンが現れます。
これをクリックして、ターミナルを開きます。

![ランチャーでターミナルを開くGIF](image1.png "image_tooltip")

ターミナルを開いたら、コマンドを入力していきます。
Beta版のZwinでは、 以下の注意点があります。
- VSCodeなどの、Waylandクライアントではない2Dアプリはまだサポートしていないので、**VimやnanoなどのCUIエディタを利用してください。**
- コピーアンドペーストはまだサポートしていないので、**文字はキーボードで入力してください**。

まず、このチュートリアル用のrepositoryをcloneします。
```
$ git clone https://github.com/zwin-project/celestial-body-app
$ cd celestial-body-app
```

ビルドとインストールをしましょう。
```
$ meson build
$ ninja -C build install
```

## 3Dアプリの実行
ビルドとインストールが成功したら、手元に`celestial-body-app`というバイナリがインストールされたはずなので、実行してみます。
```
$ celestial-body-app
```

![celestial-bodyの様子 moon](image1.png "image_tooltip")

このように簡単にアプリを起動できます。

`Ctrl + C`か`pkill celestial-body-app`などでアプリを閉じます。

## 簡単なロジックの変更

では、まず簡単な変更として、試しにTextureとnameplate名を変えてみましょう。

```
$ cd celestial-body-app
$ vim ./src/main.cc # vimじゃなくても構いません。好きなCUIエディタを使ってください。
```

`main`関数を以下のように修正します。
```:src/main.cc
.
.
int
main(int argc, char const* argv[])
{
  // 以下の2行を変更
  std::string path("./assets/earth.jpg");
  std::string name("Earth");
  // std::string path("./assets/moon.jpg");
  // std::string name("Moon");
  CelestialBody celestial_body(path.c_str());

  if (!celestial_body.Init(name, 0.1)) return EXIT_FAILURE;

  return celestial_body.Run();
}

```


再度以下のコマンドでビルドして、実行します。
```
$ ninja -C build install
```
```
$ celestial-body-app
```

![celestial-bodyの様子 earth](image1.png "image_tooltip")

地球に変わりました！

## 複雑なロジックの追加
前の項目では、設定ファイルでも変更できそうな、簡単なパラメータの変更のみとなりましたが、アプリのソースコードはC++であり、もちろん複雑なロジックも追加することができます。

Zwinでアプリを作る上での制約となるのは、OpenGL ESライクな描画と入力に関するプロトコルです。
プロトコルとクライアントの関係は[Zwinとは？](/ja/what_is_it/what_is_Zwin)のドキュメントをご覧ください。
プロトコルの実際の中身は[こちら](https://github.com/zwin-project/zwin/tree/draft/protocol)をご覧ください。

ここでは地球をRayのスクロールで回転できるようにしましょう。
まず、アプリが入力を受け取れるようにします。
そのためには、Regionという入力領域を3DアプリにSetします。
これはUnityなどのゲームエンジンにおけるColliderのようなものです。
コード上では次の変更を加えます。
```:src/main.cc
.
.
.
class CelestialBody final : public zukou::IBoundedDelegate,
                            public zukou::ISystemDelegate
{
  bool Init(std::string& name, float radius)
  {
    if (!system_.Init()) return false;
    if (!bounded_.Init(glm::vec3(radius))) return false;
    if (!region_.Init()) return false;

    bounded_.SetTitle(name);

    // 次の2行を追加
    region_.AddCuboid(glm::vec3(radius), glm::vec3(0), glm::quat(glm::vec3(0)));
    bounded_.SetRegion(&region_);

    auto jpeg_texture = std::make_unique<JpegTexture>(&system_);

    if (!jpeg_texture->Init()) return false;
    if (!jpeg_texture->Load(texture_path_)) return false;

    sphere_.Bind(std::move(jpeg_texture));

    return true;
  }
};
.
.
.
```
Regionには直方体や球の領域を追加することができます。
（今後もっと複雑な入力領域を定義できるようにする予定です！）

ここでは直方体（立方体）の領域を追加しています。
直方体は原点に設置していて、その半径を惑星の半径と一致させています。
それを3Dアプリ（`bounded_`）にSetしています。Boundedは3Dアプリの一種です。Boundedの詳しい説明は[3Dウィンドウ](/ja/what_is_it/3d_window)をご覧ください。

Regionをつけたことで、その領域とRayが交差してスクロールのイベントが発生した時に`RayAxisFrame`が呼ばれます。これはZukouというライブラリによる抽象化で、実際には[Zwinプロトコル](https://github.com/zwin-project/zwin/tree/draft/protocol)から生成されたヘッダファイルを使って振る舞いを記述できます。プロトコルは特定の言語に依存していないので、別の言語で3Dアプリを実装することも可能です。
```
.
.
  // 関数の中身を実装
  void RayAxisFrame(const zukou::RayAxisEvent& event) override
  {
    spin_angle_ += event.vertical;
    spin_angle_ %= 360;

    float theta = 2.0 * M_PI * spin_angle_ / 360.0;

    glm::mat4 transform = glm::rotate(glm::mat4(1), theta, glm::vec3(0, 1, 0));
    sphere_.Update(transform);

    bounded_.Commit();
  }
.
.
private:
 int spin_angle_ = 0; // この行を追加
.
.
```
上記のように、現在の回転角（Degree）を`spin_angle_`として保持して、スクロールの値を足していきます。
この値からラジアンの回転角`theta`を求め、惑星`sphere_`を回転させる行列を算出し、`sphere_`の位置を設定する行列を更新しています。
`bounded_.Commit()`は上記の変更を描画に反映させるための命令です。
この命令は例えばフレームをまたいで状態を生成している時に、途中の状態が描画されてしまわないように、状態が反映されるタイミングを制御するために存在しています。

再度以下のコマンドでビルドして、実行します。
```
$ ninja -C build install
```
```
$ celestial-body-app
```

![celestial-bodyが回転する様子 earth](image1.png "image_tooltip")

これでスクロールで惑星を回すことができる、地球儀に近いアプリができました！
Zwinでは、このようにアプリの修正とビルドと実行をVR空間の中で全て行うことができます。

## まとめ

上記で実装したように、Zwinでは特定の空間を占有する**小さな**アプリを実装することができます。

開発者の目線でのメリットは以下です。
- アプリを修正、再ビルド、実行を全てVR空間の中で完結して行える
- 小さいアプリを作れる
  - 既存のVRの"Big App"のように"全て"を作る必要はないのです！
  - 今のVRは例えば時計を表示するアプリを作るために部屋も作らなければいけません。時計だけ作りたいですよね？Zwinならできます。

ユーザーもこの小さいアプリを組み合わせて使うことができます。
Zwinは生まれたばかりのプロジェクトなので、まだ十分な数の3Dアプリがありません。
ぜひ小さいアプリを作ってみてください。

UNIX哲学の[Do one thing, and do it well.](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well)を体現するアプリを作って、オープンなVRやAR空間を築きましょう。
