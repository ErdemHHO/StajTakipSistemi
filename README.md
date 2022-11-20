# STAJ TAKİP SİSTEMİ

## ÇALIŞMA AMACI

Proje kapsamında kullanıcı girdilerine bağlı, dinamik olarak doküman (PDF)
oluşturabilen bir sistemin geliştirilmesi beklenmektedir. Kullanıcı bilgileri; staj
başvurusunda talep edilen öğrenci bilgileri, firma bilgileri, açık adres ve iletişim
bilgileridir. Bu bilgilerin kullanılması suretiyle dinamik bir başvuru dokümanı
oluşturulması ve oluşturulan bu doküman üzerinden staj başvuru işlemlerinin
yürütülmesi amaçlanmaktadır. 

Aşağıdaki link üzerinden proje içeriğine ait oluşturulmuş gerekli bilgilendirme metnine ve projenin genel tasarım kalıplarına ulaşabilirsiniz.

Proje bilgilendirme dökümanına ulaşmak için [tıklayınız](https://drive.google.com/file/d/18SocTw9Kop8EgYFbXkPd7h-qSzs0Vm1l/view?usp=share_link)


### Kullanılan Npm Paketleri

- express
- mysql2
- express-session
- sequelize
- nodemailer
- sequelize-auto
- puppeteer
- multer
- html2canvas
- jspdf
- bcrypt
- connect-session-sequelize
- cookie-parser
- ejs
- csurf

### ÇALIŞTIRMA AŞAMALARI

Projeye ait verilen teknolojiler ve gerekli dosyalar indirildikten sonra **.rar** dosyası klasöre çıkartılmalı ve Visual Studio Code üzerinde açılmalıdır. Açılan dosyanın **terminal-powershell** kısmına sırasıyla aşağıda verilen işlemler uygulanmalıdır;

- ```
  npm init --yes
  ```

- ```
  npm i express mysql2 ejs express-session sequelize 
  ```
  
- ```
  npm i bcrypt multer connect-session-sequelize cookie-parser
  ```
- ```
  npm i nodemon  
  ```
  
şeklinde ilgili paketler yüklenmelidir. Ardından proje çalıştırılmalıdır;

- ```
  node index.js  
  ```
- ```
  nodemon index  
  ```
