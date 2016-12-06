var clock = new THREE.Clock(),
	addEventListeners = function () {
		document.body.addEventListener('click', bindPlay, false);
	},
	bindPlay = function () {
		var video = document.getElementById('video');
		video.play();
		document.body.removeEventListener('click', bindPlay);
	},
	resize = function () {
		var width = container.offsetWidth;
		var height = container.offsetHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(1200, 500);
		effect.setSize(1200, 500);
	},
	update = function (dt) {
		resize();
		//controls.update(dt);
	},
	render = function () {
	effect.render(scene, camera);
	},
	animate = function () {
		requestAnimationFrame(animate);
		update(clock.getDelta());
		render();
	},
	fullscreen = function () {
		if (container.requestFullscreen) {
		container.requestFullscreen();
		} else if (container.msRequestFullscreen) {
		container.msRequestFullscreen();
		} else if (container.mozRequestFullScreen) {
		container.mozRequestFullScreen();
		} else if (container.webkitRequestFullscreen) {
		container.webkitRequestFullscreen();
		}
	},
	init = function () {
		renderer = new THREE.WebGLRenderer();
		element = renderer.domElement;
		container = document.getElementById('3dContainer');
		container.appendChild(element);
		scene = new THREE.Scene();

		var sphere = new THREE.SphereGeometry(500, 500, 40);
		sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

		var videoTexture = new THREE.VideoTexture(video);
		videoTexture.minFilter = THREE.LinearFilter;
		var videoMaterial = new THREE.MeshBasicMaterial({
		map: videoTexture
		});
		videoMesh = new THREE.Mesh(sphere, videoMaterial);

		effect = new THREE.StereoEffect( renderer );
		effect.eyeSeparation = 10;
		effect.setSize(1200, 500);
		camera = new THREE.PerspectiveCamera(150, 1, 0.001, 700);

		camera.position.set(250, 50, 100);
		scene.add(camera);

		controls = new THREE.OrbitControls(camera, element);
		controls.rotateUp(Math.PI / 4);
		controls.target.set(
		camera.position.x + 0.1,
		camera.position.y,
		camera.position.z
		);
		controls.noZoom = true;
		controls.noPan = true;

		function setOrientationControls(e) {
			if (!e.alpha) {
			return;
			}
			controls = new THREE.DeviceOrientationControls(camera, true);
			controls.connect();
			controls.update();
			window.removeEventListener('deviceorientation', setOrientationControls, true);
		}

		window.addEventListener('deviceorientation', setOrientationControls, true);

		scene.add(videoMesh);
		window.addEventListener('resize', resize, false);
		animate();
		/*setInterval(function () {
			animate();
		}, 5);*/
	};
init();