import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshBVH, ExtendedTriangle } from '..';
import { generateEdges, lineIntersectTrianglePoint, getTriYAtPoint } from './utils/edgeUtils.js';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const params = {

};

let renderer, camera, scene, model, clock, gui, helper, controls;
let bvh;

init();

async function init() {

	const bgColor = 0xeeeeee;

	// renderer setup
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( bgColor, 1 );
	renderer.outputEncoding = THREE.sRGBEncoding;
	document.body.appendChild( renderer.domElement );

	// scene setup
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xffca28, 20, 60 );

	const light = new THREE.DirectionalLight( 0xffffff, 1 );
	light.position.set( 1, 2, 3 );
	scene.add( light );
	scene.add( new THREE.AmbientLight( 0xb0bec5, 0.8 ) );

	model = new THREE.Mesh( new THREE.TorusKnotBufferGeometry() );
	// model = new THREE.Mesh( new THREE.ConeBufferGeometry() );
	// model = new THREE.Mesh( new THREE.RingGeometry( undefined, undefined, 20 ) );
	// model = new THREE.Mesh( new THREE.BoxBufferGeometry( 1, 1, 1, 5, 5, 5 ), new THREE.MeshStandardMaterial( { side: 2 }) );
	model.geometry.rotateX( - Math.PI / 3 ).rotateZ( - Math.PI / 3 );
	// model.geometry.clearGroups();
	// model.geometry.index = new THREE.BufferAttribute( new Uint32Array( [  14, 15, 13, 16, 18, 17, 18, 19, 17 ] ), 1 );
	// model.geometry = model.geometry.toNonIndexed();
	console.log( model.geometry.attributes.position.array )

// 0, 2, 1, 2, 3, 1,
// 4, 6, 5, 6, 7, 5,
// 8, 10, 9, 10, 11, 9,
// 12, 14, 13, 14, 15, 13
// 22,23,21,20,22,21
// 16, 18, 17, 18, 19, 17

	console.log( model )


	const gltf = await new GLTFLoader().loadAsync( new URL( './models/tables_and_chairs.gltf', import.meta.url ).toString() );
	// model = gltf.scene;

	const mergedGeom = mergeBufferGeometries( gltf.scene.children[ 0 ].children.map( c => c.geometry ) );
	model = new THREE.Mesh( gltf.scene.children[ 0 ].children[ 2 ].geometry, new THREE.MeshStandardMaterial() );
	model = new THREE.Mesh(mergedGeom, new THREE.MeshStandardMaterial() );
	model.geometry.center();

	scene.add( model )

	// console.log( gltf );
	bvh = new MeshBVH( model.geometry );

	// camera setup
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 50 );
	// camera = new THREE.OrthographicCamera( - 10, 10, 10, - 10 );
	camera.position.set( 0, 0, 4 );
	camera.far = 100;
	camera.updateProjectionMatrix();

	clock = new THREE.Clock();

	controls = new OrbitControls( camera, renderer.domElement );

	gui = new GUI();

	console.time( 'TEST' );
	updateEdges();
	console.timeEnd( 'TEST' );

	// scene.add( new THREE.LineSegments( new THREE.EdgesGeometry( model.geometry ), new THREE.LineBasicMaterial( { color: 0 } ) ) );


	window.addEventListener( 'resize', function () {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}, false );

	// scene.add( new THREE.AxesHelper ())
	render();

}

function updateEdges() {

	// const a = new THREE.Vector3( - 1, 0, - 1 );
	// const b = new THREE.Vector3( 1, 0, - 1 );
	// const c = new THREE.Vector3( 0, 0, 1 );
	// const tri = new ExtendedTriangle( a, b, c );
	// tri.needsUpdate = true;

	// const l = new THREE.Line3();
	// l.end.set( 0.5, 2, - .5 );
	// l.start.set( 0.5, - 2, .5 );

	// l.end.set(  0, 0, 1 );
	// l.start.set( 0, -1, -0 );

	// const trimmedLine = new THREE.Line3();
	// const res = trimToBeneathTriPlane( tri, l, trimmedLine );

	// console.log( res );
	// const overlaps = [];
	// getProjectedOverlaps( tri, trimmedLine, overlaps );
	// console.log( overlaps );


	// const edgeArray = [
	// 	a.x, a.y, a.z,
	// 	b.x, b.y, b.z,

	// 	a.x, a.y, a.z,
	// 	c.x, c.y, c.z,

	// 	b.x, b.y, b.z,
	// 	c.x, c.y, c.z,

	// 	trimmedLine.start.x, trimmedLine.start.y, trimmedLine.start.z,
	// 	trimmedLine.end.x, trimmedLine.end.y, trimmedLine.end.z,
	// ];

	// const edgeGeom = new THREE.BufferGeometry();
	// const edgeBuffer = new THREE.BufferAttribute( new Float32Array( edgeArray ), 3, true );
	// edgeGeom.setAttribute( 'position', edgeBuffer );
	// scene.add( new THREE.LineSegments( edgeGeom, new THREE.LineBasicMaterial( { color: 0 } ) ) );







	// TODO: write a simple test function for triangle / line functions
	// Algorithm to find overlaps:
	// - See if the edge intersects the triangle (use three.js ray function?)
	// - if it does not, check if the line is above or below the triangle
	//    - if it's above the tri then do nothing (no overlaps)
	// - Otherwise find the overlap segments and add the ranges to the array by trimming a flattened version of both






	const edges = generateEdges( model.geometry, new THREE.Vector3( 0, 1, 0 ), 50 );
	const finalEdges = [];
	const tempLine = new THREE.Line3();
	const tempRay = new THREE.Ray();
	const tempVec = new THREE.Vector3();
	const tempVec0 = new THREE.Vector3();
	const tempVec1 = new THREE.Vector3();
	const tempDir = new THREE.Vector3();
	let target = {
		line: new THREE.Line3(),
		point: new THREE.Vector3(),
		planeHit: new THREE.Vector3(),
		type: '',
	};

	// TODO: iterate over all edges and check visibility upwards using BVH
	let tris = 0;
	for ( let i = 0, l = edges.length; i < l; i ++ ) {

		const line = edges[ i ];
		const lowestLineY = Math.min( line.start.y, line.end.y );
		const highestLineY = Math.max( line.start.y, line.end.y );
		const overlaps = [];
		bvh.shapecast( {

			intersectsBounds: box => {

				// check if the box bounds are above the lowest line point
				box.min.y = Math.min( lowestLineY, box.min.y );
				tempRay.origin.copy( line.start );
				line.delta( tempRay.direction ).normalize();

				if ( box.containsPoint( tempRay.origin ) ) {

					return true;

				}

				if ( tempRay.intersectBox( box, tempVec ) ) {

					return tempRay.origin.distanceToSquared( tempVec ) < line.distanceSq();

				}

				return false;

			},

			intersectsTriangle: tri => {

				tris++
				// skip the triangle if it is completely below the line
				const highestTriangleY = Math.max( tri.a.y, tri.b.y, tri.c.y );

				if ( highestTriangleY < lowestLineY ) {

					return false;

				}

				if ( isProjectedTriangleDegenerate( tri ) ) {

					return false;

				}

				if ( isLineTriangleEdge( tri, line ) ) {

					return false;

				}

				trimToBeneathTriPlane( tri, line, tempLine );

				if ( isLineAboveTriangle( tri, tempLine ) ) {

					return false;

				}

				if ( tempLine.distance() < 1e-10 ) {

					return false;

				}

				getProjectedOverlaps( tri, tempLine, overlaps );
				return false;

			},

		} );

		overlapsToLines( line, overlaps, finalEdges );

	}
	console.log('CHECKED TRIS', tris );

	scene.add( edgesToGeometry( finalEdges, - 2 ) );

}

function getProjectedOverlaps( tri, line, overlaps = [] ) {

	const target = {
		line: new THREE.Line3(),
		point: new THREE.Vector3(),
		planeHit: new THREE.Vector3(),
		type: '',
	};

	const tempDir = new THREE.Vector3();
	const tempVec0 = new THREE.Vector3();
	const tempVec1 = new THREE.Vector3();
	const _tri = new ExtendedTriangle();
	const _line = new THREE.Line3();

	_line.copy( line );
	_tri.copy( tri );
	_tri.needsUpdate = true;
	_tri.update();

	// flatten them to a common plane
	_line.start.y = 0;
	_line.end.y = 0;
	_tri.a.y = 0;
	_tri.b.y = 0;
	_tri.c.y = 0;
	_tri.needsUpdate = true;
	_tri.update();

	if ( _line.distance() > 1e-10 && lineIntersectTrianglePoint( _line, _tri, target ) && target.type === 'line' ) {

		_line.delta( tempDir );
		tempVec0.subVectors( target.line.start, _line.start );
		tempVec1.subVectors( target.line.end, _line.start );

		const d0 = tempVec0.length() / tempDir.length();
		const d1 = tempVec1.length() / tempDir.length();

		if ( ! ( Math.abs( d0 - d1 ) < 1e-10 ) ) {

			overlaps.push( [ d0, d1 ] );

		}

	}

	return overlaps;

}

function isLineAboveTriangle( tri, line ) {

	const point = new THREE.Vector3();
	const outputPoint = new THREE.Vector3();

	point.lerpVectors( line.start, line.end, 0.5 );
	getTriYAtPoint( tri, point, outputPoint );

	return outputPoint.y < point.y;

}

function isProjectedTriangleDegenerate( tri ) {

	if ( tri.needsUpdate ) {

		tri.update();

	}

	const { plane } = tri;

	return Math.abs( plane.normal.dot( new THREE.Vector3( 0, 1, 0 ) ) ) < 1e-10;

}

function trimToBeneathTriPlane( tri, line, lineTarget ) {

	if ( tri.needsUpdate ) {

		tri.update();

	}

	lineTarget.copy( line );

	// handle vertical triangles
	const { plane } = tri;
	if ( isProjectedTriangleDegenerate( tri ) ) {

		return false;

	}

	const dir = new THREE.Vector3();
	const planeHit = new THREE.Vector3();
	line.delta( dir );

	const areCoplanar = plane.normal.dot( dir ) === 0.0;


	if ( areCoplanar ) {

		return false;

	}

	const doesLineIntersect = plane.intersectLine( line, planeHit );
	if ( doesLineIntersect ) {

		const point = new THREE.Vector3();
		const p = new THREE.Vector3();

		let testPoint;
		let flipped = false;
		if ( lineTarget.start.distanceTo( planeHit ) > lineTarget.end.distanceTo( planeHit ) ) {

			testPoint = lineTarget.start;

		} else {

			testPoint = lineTarget.end;
			flipped = true;

		}

		point.lerpVectors( testPoint, planeHit, 0.5 );
		getTriYAtPoint( tri, point, p );

		if ( p.y < point.y ) {

			if ( flipped ) lineTarget.end.copy( planeHit );
			else lineTarget.start.copy( planeHit );

		} else {

			if ( flipped ) lineTarget.start.copy( planeHit );
			else lineTarget.end.copy( planeHit );

		}

		return true;

	}

	return false;

}

function isLineTriangleEdge( tri, line ) {

	// if this is the same line as on the triangle
	const triPoints = tri.points;
	for ( let i = 0; i < 3; i ++ ) {

		const ni = ( i + 1 ) % 3;
		const t0 = triPoints[ i ];
		const t1 = triPoints[ ni ];

		if (
			line.start.distanceTo( t0 ) < 1e-10 && line.end.distanceTo( t1 ) < 1e-10 ||
			line.start.distanceTo( t1 ) < 1e-10 && line.end.distanceTo( t0 ) < 1e-10
		) {

			return true;

		}

	}

	return false;

}

function overlapsToLines( line, overlaps, target = [] ) {

	overlaps = [ ...overlaps ];

	overlaps.sort( ( a, b ) => {

		return a[ 0 ] - b[ 0 ];

	} );

	for ( let i = 1; i < overlaps.length; i ++ ) {

		const overlap = overlaps[ i ];
		const prevOverlap = overlaps[ i - 1 ];

		if ( overlap[ 0 ] <= prevOverlap[ 1 ] ) {

			prevOverlap[ 1 ] = Math.max( prevOverlap[ 1 ], overlap[ 1 ] );
			overlaps.splice( i, 1 );
			i --;
			continue;

		}

	}

	const invOverlaps = [[ 0, 1 ]];
	for ( let i = 0, l = overlaps.length; i < l; i ++ ) {

		invOverlaps[ i ][ 1 ] = overlaps[ i ][ 0 ];
		invOverlaps.push( [ overlaps[ i ][ 1 ], 1 ] );

	}

	for ( let i = 0, l = invOverlaps.length; i < l; i ++ ) {

		const newLine = new THREE.Line3();
		newLine.start.lerpVectors( line.start, line.end, invOverlaps[ i ][ 0 ] );
		newLine.end.lerpVectors( line.start, line.end, invOverlaps[ i ][ 1 ] );
		target.push( newLine );

	}

	return target;

}

function edgesToGeometry( edges, y = null ) {

	const edgeArray = [];
	edges.forEach( l => {

		edgeArray.push( l.start.x, y === null ? l.start.y : y, l.start.z );
		edgeArray.push( l.end.x, y === null ? l.end.y : y, l.end.z );

	} );

	const edgeGeom = new THREE.BufferGeometry();
	const edgeBuffer = new THREE.BufferAttribute( new Float32Array( edgeArray ), 3, true );
	edgeGeom.setAttribute( 'position', edgeBuffer );
	return new THREE.LineSegments( edgeGeom, new THREE.LineBasicMaterial( { color: 0 } ) );

}

function render() {

	requestAnimationFrame( render );

	if ( helper ) {

		helper.visible = params.displayHelper;

	}

	renderer.render( scene, camera );

}
