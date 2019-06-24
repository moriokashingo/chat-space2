# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :group_users
- has_many :groups, through: :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :group_users
- has_many :users, through: :group_users
- has_many :messages


## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|groupe_id|references|foreign_key :true|
|user_id|references|foreign_key :true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|text||
|image|string| |
|groupe|references|foreign_key :true|
|user|references|foreign_key :true|
|timestamps |integer|null: false|


### Association
- belongs_to :group
- belongs_to :user

