import{a as V}from"./chunk-3DTBHB4S.js";import{A as I,B as D,D as w,E as z,F as R,G as B,c as f,f as A,i as E,z as J}from"./chunk-BVTTO4ZY.js";import"./chunk-TXXAEVAV.js";import{i as S,l as T,m as F}from"./chunk-WX3NAUWJ.js";import"./chunk-IX6G3U3V.js";import{$a as l,Bb as a,Cb as r,Fc as y,Gc as O,Hb as M,Jb as c,Kb as v,Kc as P,Sb as s,Ub as x,Vb as j,_a as d,_b as p,bc as k,oa as m,qb as b,sb as g,wa as _,xa as C}from"./chunk-XZIY7FXL.js";var G=(()=>{let i=class i{constructor(t,e,o){this.data=t,this.dialogRef=e,this.router=o}goTo(t){this.router.navigate([t])}salir(){this.goTo("home"),this.dialogRef.close()}close(){this.dialogRef.close()}};i.\u0275fac=function(e){return new(e||i)(l(I),l(J),l(f))},i.\u0275cmp=m({type:i,selectors:[["app-finjuego-modal"]],standalone:!0,features:[p],decls:9,vars:0,consts:[["mat-dialog-title",""],["mat-button","","mat-flat-button","","primary","","id","button-display",3,"click"]],template:function(e,o){e&1&&(a(0,"h2",0),s(1,"Ganaste!"),r(),a(2,"mat-dialog-content"),s(3,"Ganaste el juego! Se le sumara 1 punto a tu puntuacion general"),r(),a(4,"mat-dialog-actions")(5,"button",1),c("click",function(){return o.close()}),s(6," Volver a jugar "),r(),a(7,"button",1),c("click",function(){return o.salir()}),s(8," Salir "),r()())},dependencies:[B,w,R,z,E,A]});let n=i;return n})();var N=(n,i)=>({visible:n,invisible:i});function U(n,i){if(n&1){let u=M();a(0,"button",9),c("click",function(){let e=_(u).$implicit,o=v(2);return C(o.clickCuadrado(e))}),r()}if(n&2){let u=i.$implicit;g("ngClass",k(1,N,u.visible,!u.visible))}}function X(n,i){if(n&1&&(a(0,"div",7),b(1,U,1,4,"button",8),r()),n&2){let u=i.$implicit,t=i.index;g("ngClass","fila"+(t+1)),d(),g("ngForOf",u)}}var nt=(()=>{let i=class i{constructor(t,e,o){this.dialog=t,this.router=e,this.firestore=o,this.tirosAcertados=0,this.filas=[],this.juegoEnCurso=!1,this.cuadradoActual=null,this.puntos=0}ngOnInit(){this.inicializarFilas()}ngOnDestroy(){this.detenerJuego()}inicializarFilas(){for(let t=0;t<5;t++)this.filas.push(Array(5).fill(null).map((e,o)=>({visible:!1,id:t*5+o})))}cambiarEstadoJuego(){this.juegoEnCurso?this.detenerJuego():this.comenzarJuego()}comenzarJuego(){this.juegoEnCurso=!0,this.tirosAcertados=0,this.mostrarSiguienteCuadrado()}detenerJuego(){this.juegoEnCurso=!1,this.temporizador&&clearTimeout(this.temporizador),this.cuadradoActual&&(this.cuadradoActual.visible=!1),this.cuadradoActual=null}mostrarSiguienteCuadrado(){if(!this.juegoEnCurso)return;this.cuadradoActual&&(this.cuadradoActual.visible=!1);let t=this.filas.flat().filter(o=>!o.visible);if(t.length===0){this.finalizarJuego();return}let e=Math.floor(Math.random()*t.length);this.cuadradoActual=t[e],this.cuadradoActual.visible=!0,this.temporizador=setTimeout(()=>{this.cuadradoActual&&this.cuadradoActual.visible&&(this.cuadradoActual.visible=!1,this.mostrarSiguienteCuadrado())},800)}clickCuadrado(t){if(t.visible)if(this.tirosAcertados++,t.visible=!1,clearTimeout(this.temporizador),this.tirosAcertados===10){let e=this.dialog.open(G);this.puntos++}else this.mostrarSiguienteCuadrado()}finalizarJuego(t=`Juego terminado! Tiros acertados: ${this.tirosAcertados}`){this.detenerJuego()}salir(){this.detenerJuego(),this.dialog.open(V,{data:{title:"Salir del juego",message:"\xBFEst\xE1 seguro que desea salir del juego?"}}).afterClosed().subscribe(e=>{e===!0&&(this.puntos>0&&this.enviarPuntos(),this.router.navigate(["/home"]))})}enviarPuntos(){let t=F(this.firestore,"puntuacion"),e=localStorage.getItem("loggedUser");T(t,{user:e,juego:"paren los tiros",puntos:this.puntos})}};i.\u0275fac=function(e){return new(e||i)(l(D),l(f),l(S))},i.\u0275cmp=m({type:i,selectors:[["app-mi-juego"]],standalone:!0,features:[p],decls:16,vars:4,consts:[[1,"home-container"],[1,"game-container"],[1,"consigna-container"],[1,"campo-tiro-container"],["class","fila",3,"ngClass",4,"ngFor","ngForOf"],[1,"buttons-container"],["mat-fab","","extended","",1,"button-juego",3,"click"],[1,"fila",3,"ngClass"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"click","ngClass"]],template:function(e,o){e&1&&(a(0,"div",0)(1,"div",1)(2,"h1"),s(3,"Paren los tiros!"),r(),a(4,"div",2)(5,"p"),s(6," Intenta pegarle a todos los cuadraditos y suma puntos, no seas burro! "),r(),a(7,"h2"),s(8),r()(),a(9,"div",3),b(10,X,2,2,"div",4),r(),a(11,"div",5)(12,"button",6),c("click",function(){return o.cambiarEstadoJuego()}),s(13),r(),a(14,"button",6),c("click",function(){return o.salir()}),s(15," Salir "),r()()()()),e&2&&(d(8),j("Puntos: ",o.puntos," / Tiros acertados: ",o.tirosAcertados,""),d(2),g("ngForOf",o.filas),d(3),x(" ",o.juegoEnCurso?"Parar":"Comenzar"," "))},dependencies:[P,y,O],styles:['.home-container[_ngcontent-%COMP%]{background-image:url("./media/img-fondohome-EHGBAY2M.jpg");background-size:cover;background-repeat:no-repeat;background-position:center;height:100vh;align-items:center;display:flex;justify-content:center}.game-container[_ngcontent-%COMP%]{background-color:#fffc;max-height:800px;border-radius:10px;text-align:center;transition:background-color .3s ease;display:flex;flex-direction:column;margin-bottom:70px;padding:20px}.consigna-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:10px}.campo-tiro-container[_ngcontent-%COMP%]{background-image:url("./media/img-guerra-VXT7XILK.png");background-repeat:no-repeat;background-color:red;width:630px;height:360px;border-radius:10px;text-align:center;transition:background-color .3s ease;display:flex;flex-direction:column;margin-top:40px;align-items:center;justify-content:space-around;cursor:url("./media/img-mirilla2-IBEZ4B3H.png"),auto}.fila[_ngcontent-%COMP%]{width:90%;height:50px;display:flex;justify-content:space-between;align-items:center;border-radius:5px}.fila[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:5px;border:none;transition:opacity .3s ease;cursor:url("./media/img-mirilla2-IBEZ4B3H.png"),auto}.fila[_ngcontent-%COMP%]   button.visible[_ngcontent-%COMP%]{opacity:1}.fila[_ngcontent-%COMP%]   button.invisible[_ngcontent-%COMP%]{opacity:0;pointer-events:none}.fila1[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#ff6b6b}.fila2[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#4ecdc4}.fila3[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#45b7d1}.fila4[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#f7fff7}.fila5[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#ff8c42}.buttons-container[_ngcontent-%COMP%]{display:flex;justify-content:space-around;flex-direction:row;align-items:center;margin-top:20px}.button-juego[_ngcontent-%COMP%]{background-color:#deb887;color:#fff;display:flex;justify-content:center;align-items:center;height:40px;width:fit-content;margin:20px auto;padding:0 20px;border-radius:5px;border:none;cursor:pointer}.button-juego[_ngcontent-%COMP%]:disabled{background-color:#ccc;cursor:not-allowed}']});let n=i;return n})();export{nt as MiJuegoComponent};
