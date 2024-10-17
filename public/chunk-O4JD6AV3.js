import{a as O}from"./chunk-K2GJVW35.js";import{a as _}from"./chunk-343WTDE5.js";import{c as S,o as j}from"./chunk-USPTWZNC.js";import"./chunk-XHYQI62J.js";import"./chunk-WXI33M2S.js";import{k as E,m as w,p as I}from"./chunk-OGIXNGFF.js";import{Db as m,Eb as l,Mb as c,Nb as y,Ob as f,Tb as k,Vb as M,Wa as C,Za as s,_a as h,na as v,ob as x,qb as d,vb as o,wa as g,wb as a,xa as u,xb as P,zb as b}from"./chunk-GAGP36BF.js";var V=(n,r)=>({correcta:n,incorrecta:r});function T(n,r){if(n&1&&P(0,"img",17),n&2){let t=l(2);d("src",t.selectedPais.flags.png,C)("alt","Bandera de "+t.selectedPais.name.common)}}function R(n,r){if(n&1){let t=b();o(0,"div",4)(1,"h1"),c(2,"Preguntados!"),a(),o(3,"h2"),c(4),a(),o(5,"div",5)(6,"h2"),c(7,"\xBFDe qu\xE9 pa\xEDs es la siguiente bandera?:"),a(),o(8,"div",6),x(9,T,1,2,"img",7),a()(),o(10,"div",8)(11,"div",9)(12,"div",10),m("click",function(){g(t);let e=l();return u(e.verificarRespuesta(e.opciones[0]))}),c(13),a(),o(14,"div",11),m("click",function(){g(t);let e=l();return u(e.verificarRespuesta(e.opciones[1]))}),c(15),a()(),o(16,"div",12)(17,"div",13),m("click",function(){g(t);let e=l();return u(e.verificarRespuesta(e.opciones[2]))}),c(18),a(),o(19,"div",14),m("click",function(){g(t);let e=l();return u(e.verificarRespuesta(e.opciones[3]))}),c(20),a()()(),o(21,"div",15)(22,"button",16),m("click",function(){g(t);let e=l();return u(e.salir())}),c(23," Salir "),a()()()}if(n&2){let t=l();d("ngClass",M(7,V,t.respuestaEstado===!0,t.respuestaEstado===!1)),s(4),f("Vidas: ",t.vidas,""),s(5),d("ngIf",t.selectedPais),s(4),f(" ",t.opciones[0]," "),s(2),f(" ",t.opciones[1]," "),s(3),f(" ",t.opciones[2]," "),s(2),f(" ",t.opciones[3]," ")}}function D(n,r){n&1&&(o(0,"div"),c(1,"Cargando pa\xEDses..."),a())}function F(n,r){if(n&1&&(o(0,"div",18),c(1),a()),n&2){let t=l();s(),y(t.error)}}var G=(()=>{let r=class r{constructor(i,e,p){this.datosService=i,this.dialog=e,this.router=p,this.paises=[],this.selectedPais=null,this.loading=!0,this.error="",this.vidas=3}ngOnInit(){this.loadPaises()}loadPaises(){this.loading=!0,this.datosService.getPaises().subscribe({next:i=>{this.paises=i,this.loading=!1,this.nuevaPregunta()},error:i=>{this.error="Hubo un error al cargar los paises. Por favor, intente de nuevo.",this.loading=!1,console.error("Error loading paises:",i)}})}nuevaPregunta(){if(this.paises.length<4){this.error="No hay suficientes paises para generar una pregunta, intente mas tarde";return}this.respuestaEstado=null;let i=Math.floor(Math.random()*this.paises.length);for(this.selectedPais=this.paises[i],this.opciones=[this.selectedPais.name.common];this.opciones.length<4;){let e=this.paises[Math.floor(Math.random()*this.paises.length)].name.common;this.opciones.includes(e)||this.opciones.push(e)}this.opciones=this.opciones.sort(()=>Math.random()-.5)}verificarRespuesta(i){this.selectedPais&&i===this.selectedPais.name.common?this.respuestaEstado=!0:(this.respuestaEstado=!1,this.vidas--,this.vidas===0&&this.finDeJuego()),setTimeout(()=>{this.nuevaPregunta()},2e3)}salir(){this.dialog.open(_,{data:{title:"Salir del juego",message:"\xBFEst\xE1 seguro que desea salir del juego?"}}).afterClosed().subscribe(e=>{e===!0&&this.router.navigate(["/home"])})}finDeJuego(){this.dialog.open(_,{data:{title:"Fin del juego",message:"Perdiste! Queres seguir jugando, o salir del juego?"}}).afterClosed().subscribe(e=>{e===!0?this.router.navigate(["/home"]):this.vidas=3})}};r.\u0275fac=function(e){return new(e||r)(h(O),h(j),h(S))},r.\u0275cmp=v({type:r,selectors:[["app-preguntados"]],standalone:!0,features:[k],decls:4,vars:3,consts:[[1,"form-container"],["class","game-container",3,"ngClass",4,"ngIf"],[4,"ngIf"],["class","error-message",4,"ngIf"],[1,"game-container",3,"ngClass"],[1,"consigna-container"],[1,"bandera-container"],[3,"src","alt",4,"ngIf"],[1,"opciones-container"],[1,"opciones-fila1"],[1,"opcion1",3,"click"],[1,"opcion2",3,"click"],[1,"opciones-fila2"],[1,"opcion3",3,"click"],[1,"opcion4",3,"click"],[1,"buttons-container"],["mat-fab","","extended","",1,"button-salir",3,"click"],[3,"src","alt"],[1,"error-message"]],template:function(e,p){e&1&&(o(0,"div",0),x(1,R,24,10,"div",1)(2,D,2,0,"div",2)(3,F,2,1,"div",3),a()),e&2&&(s(),d("ngIf",!p.loading&&!p.error),s(),d("ngIf",p.loading),s(),d("ngIf",p.error))},dependencies:[I,E,w],styles:['.form-container[_ngcontent-%COMP%]{background-image:url("./media/img-fondohome-EHGBAY2M.jpg");background-size:cover;background-repeat:no-repeat;background-position:center;height:100%;display:flex;justify-content:center}.game-container[_ngcontent-%COMP%]{background-color:#fffc;max-height:820px;border-radius:10px;text-align:center;transition:background-color .3s ease;display:flex;flex-direction:column;margin-top:40px;width:auto}.game-container.incorrecta[_ngcontent-%COMP%]{background-color:#ff00004d}.game-container.correcta[_ngcontent-%COMP%]{background-color:#00ff1a6d}.consigna-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:10px}.bandera-container[_ngcontent-%COMP%]{width:460px;height:270px;text-align:center;display:flex;align-items:center;justify-content:center}.opciones-container[_ngcontent-%COMP%]{display:flex;width:800px;height:300px;justify-content:space-around;align-items:center;padding:20px;flex-direction:column}.opciones-fila1[_ngcontent-%COMP%], .opciones-fila2[_ngcontent-%COMP%]{width:700px;height:100px;display:flex;justify-content:space-between;align-items:center;padding:20px}.opcion1[_ngcontent-%COMP%], .opcion2[_ngcontent-%COMP%], .opcion3[_ngcontent-%COMP%], .opcion4[_ngcontent-%COMP%]{background-color:#deb887;width:280px;height:55px;border-radius:8px;text-align:center;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff}.button-salir[_ngcontent-%COMP%]{background-color:#deb887;color:#fff;display:flex;justify-content:center;align-items:center;height:40px;width:fit-content;margin:20px auto;padding:0 20px;border-radius:5px}']});let n=r;return n})();export{G as default};
