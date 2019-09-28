//býr til senuna og renderinn ásamt því að setja cameruna á einhvern ákveðinn stað
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,.1, 1000)
var renderer = new THREE.WebGLRenderer()
camera.position.x = 40
camera.position.y = 40
camera.position.z = 40

//setur backgroud color á senuna ásamt því að setja stærð á rendernum
renderer.setClearColor(0xdddddd)
renderer.setSize(window.innerWidth, window.innerHeight)
//gerir kleift að búa til skugga
renderer.shadowMap.enabled = true
renderer.shadowMapSoft = true

//Cube
var cubeGeo = new THREE.BoxGeometry(5,5,5)
var cubeMat = new THREE.MeshLambertMaterial({color: 0x00ff00})
var cube = new THREE.Mesh(cubeGeo, cubeMat)
cube.castShadow = true;
cube.position.y = 21;

//cone
var coneGeo = new THREE.ConeGeometry(10, 15, 5);
var coneMat = new THREE.MeshLambertMaterial( {color: 0xffff00} );
var cone = new THREE.Mesh(coneGeo, coneMat);
cone.position.y += 3;

//donut
var geometry = new THREE.TorusBufferGeometry( 15, 3, 16, 100 );
var material = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
var torus = new THREE.Mesh( geometry, material );
torus.rotation.x += 6;
console.log(torus.rotation);

//light
var spotlight = new THREE.SpotLight(0xffffff)
spotlight.castShadow = true
spotlight.position.set(30,60,60)

//bætir öllu við senuna
scene.add(spotlight)
scene.add(cone);
scene.add(cube);
scene.add(torus);

//lookAt gerir það að cameran horfir á eitthvað ákveðið
camera.lookAt(scene.position)
//ég bæti við onclick listener á alla senuna þannig að þegar eitthvað er ýtt á þá kallar hún randomColor fallið
renderer.domElement.addEventListener( "click", randomColor );
document.body.appendChild(renderer.domElement)

//setti öll geos í array for simplicity sake
var Geos = [cone, cube, torus];
function randomColor(){
	//fyrir hvert geo er búið til ný tala
	for (let index = 0; index < Geos.length; index++) {
		//þar sem allir litir eru á bilinu 0-1 og gera eitthvað mjög skrítið þegar þeir eru yfir því
		//þá deili ég með 255 til þess að fá sama lit meira og minna
		var randA = Math.floor(Math.random()*256)/255;
		var randG = Math.floor(Math.random()*256)/255;
		var randB = Math.floor(Math.random()*256)/255;
		//setur random tölurnar sem gildi á hlutnum
		Geos[index].material.color.r = randA;
		Geos[index].material.color.g = randG;
		Geos[index].material.color.b = randB;
	}
}

//render er fall sem er kallað á aftur og aftur til þess að teikna senuna aftur og aftur
var render = function () {
	//það er samt enderkallað með requestanimationframe sem er betra fyrir cpuinn þar sem hann er ekki að brute forca að keyra fallið
	requestAnimationFrame( render );
	//snýr hlutum sem eiga að snúast í senuni
	spinObjects();
	//renderar allt á senuni
	renderer.render(scene, camera);
};
render();

var rotation = 0
var spin = 0;
function spinObjects(){
	rotation += 0.003
	spin += 0.008
	//þetta setur ný value á position þannig að cameran færist en er ennþá að focusa á miðjuna
	//cos og sin eru notaðir til þess að cameran færist í hringi
	camera.position.z = Math.sin(rotation) * 80;
	camera.position.x = Math.cos(rotation) * 80;
	camera.lookAt(scene.position);
	//þetta setur bara nýtt rotation value á hlutina
	cube.rotation.y = spin;
	torus.rotation.x = spin;
}