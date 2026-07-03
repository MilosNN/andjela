const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w,h;

function resize(){

    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
}

resize();

window.addEventListener("resize",resize);

let particles=[];

function heart(t){

    let x=16*Math.pow(Math.sin(t),3);

    let y=13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);

    return{

        x:x*14+w/2,
        y:-y*14+h/2
    }
}

function createHeart(){

    particles=[];

    for(let i=0;i<500;i++){

        let t=Math.random()*Math.PI*2;

        let p=heart(t);

        particles.push({

            hx:p.x,
            hy:p.y,

            tx:0,
            ty:0,

            x:p.x,
            y:p.y

        });
    }

    createText();
}

function createText(){

    const off=document.createElement("canvas");
    off.width=w;
    off.height=h;

    const ictx=off.getContext("2d");

    ictx.fillStyle="white";

    ictx.textAlign="center";

    ictx.font="bold "+Math.min(w*0.18,90)+"px Arial";

    ictx.fillText("Anđela",w/2,h/2);

    let img=ictx.getImageData(0,0,w,h).data;

    let pts=[];

    for(let y=0;y<h;y+=6){

        for(let x=0;x<w;x+=6){

            let i=(y*w+x)*4;

            if(img[i+3]>100){

                pts.push({x,y});
            }
        }
    }

    for(let i=0;i<particles.length;i++){

        let p=pts[i%pts.length];

        particles[i].tx=p.x;
        particles[i].ty=p.y;
    }

}

createHeart();

function draw(){

    ctx.clearRect(0,0,w,h);

    let scroll=window.scrollY/(document.body.scrollHeight-window.innerHeight);

    particles.forEach(p=>{

        p.x=p.hx+(p.tx-p.hx)*scroll;

        p.y=p.hy+(p.ty-p.hy)*scroll;

        ctx.beginPath();

        ctx.fillStyle="rgb(255,60,90)";

        ctx.arc(p.x,p.y,2,0,Math.PI*2);

        ctx.fill();

    });

    requestAnimationFrame(draw);
}

draw();