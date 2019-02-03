// index.js

'use strict';




const koa = require('koa')
const koaBody = require('koa-body');
const koaRouter = require('koa-router')
const render = require('koa-ejs')
const path = require('path')


const app = new koa()
const router = new koaRouter()

var list=[]
list.push({
  langue : 'Inconnu',
  hello : 'Je ne connais pas cette langue'
  })

render(app, {
  root: path.join(__dirname, 'views'),
  layout : false,
  viewExt: 'html',
  cache: false,
  debug: true
})

router.get('koala','/hello', (ctx) => {
  let lg = ctx.request.query.langue
  let i =0
  let s=0
  while(i<list.length){
    if(list[i].langue == lg){
      s=i
    }
    i++
  }
  return ctx.render('index', {
    liste : list[s].hello
   
  })
})

router.get('koala','/formulaire', (ctx) => {
  return ctx.render('formulaire')
  })

router.get('koala','/suppression', (ctx) => {
  return ctx.render('suppression')
  })


router.post('koala','/hello', koaBody(), (ctx) => {
  list.push({
  langue : ctx.request.body.langue,
  hello : ctx.request.body.hello
  })
  console.log(ctx.request.body)
  return ctx.render('index', {
    liste : list[0].hello
   
  })
})


router.post('koala','/sup', koaBody(), (ctx) => {
  let lg = ctx.request.body.langue
  console.log(lg)
  let j=0
  while(j<list.length){
    if(list[j].langue == lg){
      list.splice(j ,1)
    }
    j++
  }
  return ctx.render('index', {
    liste : list[0].hello
   
  })
})

app.use(router.routes())
    .use(router.allowedMethods())



/*app.use(function*(){ 
	this.body="hello";
});*/



app.listen(1234)
