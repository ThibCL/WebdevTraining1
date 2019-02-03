// index.js

'use strict';




const koa = require('koa')
const koaBody = require('koa-body');
const koaRouter = require('koa-router')
const render = require('koa-ejs')
const path = require('path')


const app = new koa()
const router = new koaRouter()

//liste qui contient toutes les façons de dire bonjour dans les langues connues
var list=[]
list.push({
  langue : 'Inconnu',
  hello : 'Je ne connais pas cette langue'
  })

//Fonction qui permet de regarder si une langue est déja dans la liste des langues connues 
function dansListe (lister,lgs) {
	var res = true
	for( var k=0 ; k<lister.length ; k++){
		if(lister[k].langue==lgs){
			res=false;
		}
	}
	return res;
}

render(app, {
  root: path.join(__dirname, 'views'),
  layout : false,
  viewExt: 'html',
  cache: false,
  debug: true
})

//Methode get qui permet de dire bonjour dans la langue voulu
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
    liste : list[s].hello,
    connu : list
   
  })
})

//Méthode get pour récupérer la page d'ajout d'une langue
router.get('koala','/formulaire', (ctx) => {
  return ctx.render('formulaire')
  })

//Méthode get pour récupérer la page de suppression d'une langue
router.get('koala','/suppression', (ctx) => {
  return ctx.render('suppression')
  })

//Méthode post qui permet d'apprendre une nouvelle langue
router.post('koala','/hello', koaBody(), (ctx) => {
  if(dansListe(list,ctx.request.body.langue)){
	  list.push({
	  langue : ctx.request.body.langue,
	  hello : ctx.request.body.hello
	  })
  }
  return ctx.render('index', {
    liste : list[0].hello,
    connu : list
   
  })
})

//Méthode post qui permet de supprimer une langue
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
    liste : list[0].hello,
    connu : list
   
  })
})

app.use(router.routes())
    .use(router.allowedMethods())







app.listen(1234)
