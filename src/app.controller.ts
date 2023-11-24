import { Body, Controller, Get, HttpCode, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistrationDto } from './registration.dto';
import { error } from 'console';
import { User } from './user';
import { Response } from 'express';
import { ProductRegistration } from './product.dto';
import { Product } from './product';

const users: User[] = [
  new User('admin@example.com','asdf1234',23)
];
const products: Product[] = [
  new Product('AB1234','perfect','fülhallgató')
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('register')
  @Render('registerForm')
  registerForm()
  {
    return {
      errors: []
    };
  }

  @Post('register')
  @Render('registerForm')
  register(@Body() registration: RegistrationDto, @Res() res: Response) {
    const errors: string[] = [];
    if(!registration.email.includes('@')) {
      errors.push('Az email cím formátuma nem megfelelő!');
    }
    if(registration.password.length < 8) {
      errors.push('A jelszó legalább 8 karakter legyen.');
    }
    if(registration.password != registration.password_again) {
      errors.push('A két jelszó nem egyezik!');
    }
    const age = parseInt(registration.age);
    if(age < 18 || isNaN(age)) {
      errors.push('Az életkornak 18-nál nagyobb számnak kell, hogy legyen!')
    }
    if(errors.length > 0) {
      return {
        errors,
      };
    } else {
      //Valódi alkalmazásban itt lenne a DB-be írás
      users.push(new User(registration.email,registration.password,parseInt(registration.age)))
      console.log(users);
      //redirect: visszadob az adott oldalra
      res.redirect('/');
    }
  }


  @Get('product')
  @Render('productForm')
  productForm()
  {
    return {
      errors: []
    };
  }

  @Post('product')
  @Render('productForm')
  product(@Body() registration: ProductRegistration, @Res() res: Response) {
    const errors: string[] = [];
    const mintaSerialNumber = /^[A-Z]{2}[0-9]{4}$/i;
    if(!mintaSerialNumber.test(registration.serial_number)) {
      errors.push('A serial number formátuma nem megfelelő!');
    }
    if(!(registration.condition == 'perfect' || registration.condition == 'damaged')) {
      errors.push('A termék állapotának "perfect"-nek vagy "damaged"-nek kell lennie.');
    }
    if(registration.name.length < 3) {
      errors.push('A termék nevének hosszabbnak kell lennie mint 3 karakter.')
    }
    if(errors.length > 0) {
      return {
        errors,
      };
    } else {
      products.push(new Product(registration.serial_number,registration.condition,registration.name))
      console.log(products);
      res.redirect('/product');
    }
  }
}
