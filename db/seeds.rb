# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Category .create([{ name: '事務' }, { name: 'エンジニア' }, { name: '営業' }, { name: 'デザイン' }, { name: 'マーケティング' }, { name: '財務・経理' }, { name: '人事' }, { name: 'カスタマーサポート' }, { name: '製造' },{ name: '医療' }, { name: '介護' }])