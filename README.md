セットアップ
---
* リポジトリの作成
githubで新しいリポジトリを作成
リポジトリ名はchat_app

* flux_tutorialのリポジトリをクローン
```
$ git clone -b master https://github.com/Progate/flux_tutorial.git
```
gitリポジトリのURLを変更
```
$ git remote set-url origin https://github.com/アカウント名/chat_app.git
```

* アプリケーションのセットアップ
```sh
# Gemのインストール
$ bundle install
```

* js周りのセットアップ
nodebrew,node,npmを下記サイト等を参考にインストール
http://qiita.com/sinmetal/items/154e81823f386279b33c
```sh
$ npm install
# jsのビルド

$ npm run watch
# jsの開発時に走らせておくと、自動でビルドが走る(エラー箇所等を教えてくれます)。
# 3877448 bytes written to public/assets/javascripts/boot.js (1.20 seconds)のような1行が出たら成功です。
```

###セットアップ完了
ここまで全て完了したら、fluxチュートリアルに移りましょう。
チュートリアルはwikiにあります。

---
devise周りに関して

操作としては以下の手順で行った
* Gemfileの編集
```
# gem 'devise'の追加
$ bundle install
```

* devise関連ファイルの追加
```
$ rails g devise:install
```
表示される1~4(もしくは1~5)のうち最後以外は無視して構わないと思われる
最後のViewの生成はデフォルト通り以下のように行う

* deviseのViewの生成
```
$ rails g devise:views
```

* Userモデルの作成
```
$ rails g devise User
```
生成されるapp/models/user.rbファイルを編集したり、マイグレーションファイルのコメントアウトを外したりするところもあるが、とりあえずはこのままマイグレーションを行う。
ただし今回はnameカラムの追加を行うので、以下を実行する形で行う
```
$ rails g migration add_name_to_users name:string
```
最後にマイグレーションの実行
```
$ rails db:migrate
```

* コントローラ周り
これだけでは実際にViewで生成したページが反映されないので、以下のコマンドを実行
```
$ rails g devise:views users (実行済み)
$ rails g devise:controllers users
# ルーティングの編集(config/routes.rb)
  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'   
  } 

  devise_scope :user do
    get "sign_in", :to => "users/sessions#new"
    get "sign_out", :to => "users/sessions#destroy" 
  end
※デフォルトで表示されるのは以下
  Rails.application.routes.draw do
      devise_for :users, controllers: {
        sessions: 'users/sessions'
      }
  end
#再起動して動くか実行
$ rails s
```

* 最後に
deviseではusers#index, users#show に対応するものは作成されない
そこで以下を実行
```
$ rails generate controller Users index show
```
これでコントローラとビューは作成される。
ルーティングもデフォルトで作成される。が今回の場合は
		users_index GET   /users/index(.:format)         users#index
        users_show GET    /users/show(.:format)          users#show
となっておりこれはあまり使えない。
そこでルーティングでデフォルトで生成されるものの代わりに以下のものを実行
```
resources :users, :only => [:index, :show]
# get 'users/index'
# get 'users/show'
```
ルーティングの確認は以下のコマンドで
```
$ rails routes
```
        users GET   /users(.:format)               users#index
        user GET    /users/:id(.:format)           users#show
のようになってれはOK


以上。


* 参考
```
前半
http://qiita.com/cigalecigales/items/73d7bd7ec59a001ccd74
http://qiita.com/itboze/items/f991d54ff527edb844d9
http://qiita.com/Salinger/items/873e3c667462746ae707
https://techacademy.jp/magazine/7336
後半
http://easyramble.com/routing-by-devise-for.html
http://easyramble.com/create-users-index-show-on-devise.html
http://qiita.com/itboze/items/f991d54ff527edb844d9
```