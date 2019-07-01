json.array! @users do |user|
  json.id user.id
  json.name user.name
end

# arryでいわばeach文にしてる。idはグループ保存する際にいる。