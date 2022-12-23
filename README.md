
# Secure Wallet

Secure wallet is application which is used to store Passwords & Card releated information in a secure way. It consist of Password Wallet & card Wallet.

**Password Wallet**
The Password Wallet protects your passwords by scrambling them with AES-512, one of the strongest encryption algorithms available. 



**Card Wallet**
The Card Wallet is used for storing the card data like credit & debit card information. We are using AES-512 for scrambling saved card information.


## 1. Authors

- [@Nayan Yempati]()


## API Reference

#### Account Controller

```http
GET
/api/account/ping

POST
/api/account/register

POST
/api/account/login

POST
/api/account/forgot/{email}

POST
/api/account/changepassword

PATCH
/api/account/updateprofile

GET
/api/account/userdetails
```

#### Card Controller

```http
GET
/api/card/search/{number}

GET
/api/card/list

POST
/api/card/add

PUT
/api/card/update/{token}

DELETE
/api/card/delete/{token}

GET
/api/card/view/{token}
```


###Password Controller

```http
GET
/api/password/search/{key}

GET
/api/password/list

GET
/api/password/list/{key}

POST
/api/password/add

PUT
/api/password/update/{token}

DELETE
/api/password/delete/{token}

GET
/api/password/view/{token}
```


#### User Controller

```http
POST
/api/uploads/upload
```


## 4. Database Schema
![](https://raw.githubusercontent.com/nayanyempati/Image-Repo/main/db%20schema.png)

**Password Encryption**
![](https://raw.githubusercontent.com/nayanyempati/Image-Repo/main/Password%20Encryption.png)

**Card Data Encryption**
![](https://raw.githubusercontent.com/nayanyempati/Image-Repo/main/Card%20Data%20encryption.png)
