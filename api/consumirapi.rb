require 'net/http'
require 'json'

DEV = 'http://localhost:3000/'
PROD = 'https://prsteam2.herokuapp.com/'

uri = URI("#{PROD}api/auth")
res = Net::HTTP.post_form(uri, 'correo' => 'civargas5@uc.cl', 'contraseña' => '123456')
token = JSON.parse(res.body)["token"]


url = URI("#{PROD}api/recinto_deportivos")
req = Net::HTTP::Get.new(url.to_s)
req['Authorization'] = "Bearer #{token}"
res = Net::HTTP.start(url.host, url.port) {|http|
  http.request(req)
}
puts JSON.parse(res.body)["recintos_deportivos"]