angular.module("homeapp", [])
  .component("navigation",{
      templateUrl: "http://localhost:3000/js/templates/navigation.html",
  });

$(document).ready(function() {
  var info = document.getElementById("info");
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, 400 / 300, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( 400, 300 );
  info.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 3, 3, 3 );
  var material = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  function render() {
  	requestAnimationFrame( render );
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
  	renderer.render( scene, camera );
  }
  render();
});
