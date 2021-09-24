// purpose of this is to find the binding energy

var captured = []


const  canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
var offsetX = canvas.width / 4
var offsetY = canvas.height / 10
var zoom = 0.01

const particles = []


//    addParticle(1, 2/3, Math.random() * canvas.width / zoom, Math.random() * canvas.height / zoom, Math.random() * 100000)
//    addParticle(1, -1/3, Math.random() * canvas.width / zoom, 200000 + Math.random() * canvas.height / zoom, Math.random() * 100000)

for (var i = 0; i < 100; i++) {
    addParticle(1, -1, 10000 + Math.random() * canvas.width / zoom, 10000 + Math.random() * canvas.height / zoom, 10000 + Math.random() * canvas.height / zoom)
    addParticle(50, 1, 10000 + Math.random() * canvas.width / zoom, 10000 + Math.random() * canvas.height / zoom, 10000 + Math.random() * canvas.height / zoom)
    //addParticle(1, -1, 10000 + Math.random() * canvas.width / zoom, 10000 + Math.random() * canvas.height / zoom, 10000 + Math.random() * canvas.height / zoom)
    
}

zoom = 0.002
draw()

var intervalHandle = setInterval(() =>{
    physics()
}, 1)

var drawHandle = setInterval(() =>{
    draw()
}, 1000/60)
    
var p, p2, d, f, last
const Ke = 8.98755e9 



function physics() {
    for (p of particles) {
        p.edx = 0
        p.edy = 0
        p.edz = 0
           
        if (p.charge && !p.bound) {
            for (p2 of particles) {
                if (p === p2 || !p2.charge || p2.bound) continue
                
                d = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2) + Math.pow(p.z - p2.z, 2))
                
                f = (Ke * p.charge * p2.charge) / (d*d)
                
                if (p.charge === p2.charge * -1 && Math.abs(f) > Math.abs(d)) {
                    p.bound = p2
                    p2.bound = p
                    console.log(f, d)
                    if (p2.m === 50)
                        captured.push({f, d})
                }
                else {
                    p.edx += f / p.m * (p.x - p2.x) / d
                    p.edy += f / p.m * (p.y - p2.y) / d
                    p.edz += f / p.m * (p.z - p2.z) / d
        
                }
                
            }
        }
    }
    for (p of particles) {
        p.x += p.dx + p.edx
        p.y += p.dy + p.edy
        p.z += p.dz + p.edz
    }
}

var lineLength = 10
function draw() {
    //ctx.translate(offsetX, offsetY)

    canvas.width = canvas.width
    for (p of particles) {
        //if (p.bound) continue
        
        ctx.lineWidth = 2
        ctx.strokeStyle = p.charge < 0 ? "red" : "blue"
        ctx.globalAlpha = p.bound ? 0.5 : 1
        ctx.beginPath()
        ctx.moveTo((offsetX + p.x * zoom) - lineLength, (offsetY + p.y * zoom) + (p.charge * lineLength))
        ctx.lineTo((offsetX + p.x * zoom) + lineLength, (offsetY + p.y * zoom) - (p.charge * lineLength))
        ctx.stroke()
        
        //ctx.fillStyle = p.charge < 0 ? "red" : "blue"
        //ctx.fillRect(offsetX + p.x * zoom, offsetY + p.y * zoom, 2 * p.m, 2 * p.m)
            
    }

}





function addParticle(mass, charge, x, y, z, dx, dy, dz) {
    particles.push({
        m: mass || 0, 
        charge: charge || 0, 
        x: x || 0, 
        y: y || 0, 
        z: z || 0,
        dx: dx || 0, 
        dy: dy || 0, 
        dz: dz || 0
    })
}

function addAtom(number, x, y, z) {
    for (var i = 0; i < number; i++) {
        addParticle(-1, x, y, z)
        addParticle(0, x, y, z)
        addParticle(1, x, y, z)
    }
}


/* things to add

* magnets
* wires
* glass
* cameras
* radio broadcast/reciever
* double slit experiment


*/

document.body.onkeypress = e => clearInterval(intervalHandle)