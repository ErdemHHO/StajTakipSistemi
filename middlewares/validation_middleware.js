const{body}=require('express-validator');
const validateNewUser=()=>{
    return[
        body('kulNumara').trim()
            .isEmail().withMessage('Geçerli bir mail giriniz'),

        body('kulSifre').trim()
            .isLength({min:6}).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({max:20}).withMessage('Şifre en fazla 20 karakter olmalı'),
            
        body('kulİsim').trim()
            .isLength({min:2}).withMessage('İsim en az 6 karakter olmalı'),
    ]
}