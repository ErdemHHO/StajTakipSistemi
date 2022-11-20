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


### ÇALIŞTIRMA AŞAMALARI

Projeye ait verilen teknolojiler ve gerekli dosyalar indirildikten sonra ilgili **.rar** dosyası klasöre çıkartılmalı ve Visual Studio Code üzerinde açılmalıdır. Açılan dosyanın **terminal-powershell** kısmına sırasıyla aşağıda verilen işlemler uygulanmalıdır;

- ```
  npm init --yes
  ```

- ```
  npm install mysql2 --yes
  ```
  
- ```
  npm install bcrypt --yes
  ```
- ```
  npm install express nodemon
  ```
  
şeklinde ilgili paketler yüklenmelidir. Ardından proje çalıştırılmalıdır;

- ```
  nodemon index.js
  ```
