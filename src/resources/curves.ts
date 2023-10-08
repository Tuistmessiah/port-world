import * as THREE from 'three';

// TODO: Make it so it receives an argument that makes the circular motion around a custom point instead of the origin
// TODO: Make it go clockwise or counterclockwise
export class CircularSegmentCurve extends THREE.Curve<THREE.Vector3> {
    start = new THREE.Vector3();
    end = new THREE.Vector3();

    constructor(start: THREE.Vector3, end: THREE.Vector3) {
        super();
        this.start = start;
        this.end = end;
    }

    getPoint(t: number) {
        const angle = this.start.angleTo(this.end) * t;
        const axis = new THREE.Vector3().crossVectors(this.start, this.end).normalize();
        const rotationMatrix = new THREE.Matrix4().makeRotationAxis(axis, angle);

        // Dev: Added
        const rotatedStart = this.start.clone().applyMatrix4(rotationMatrix);
        // const direction = this.end.clone().sub(this.start).normalize();
        // const distance = this.start.distanceTo(this.end) * t;
        // console.log(t, direction);
        // return rotatedStart.add(direction.multiplyScalar(distance));

        return rotatedStart;
    }
}

export class CircularSegmentCurve2 extends THREE.Curve<THREE.Vector3> {
    start = new THREE.Vector3();
    end = new THREE.Vector3();
    startQuaternion = new THREE.Quaternion();
    endQuaternion = new THREE.Quaternion();

    constructor(start: THREE.Vector3, end: THREE.Vector3) {
        super();
        this.start = start;
        this.end = end;

        // Convert start and end vectors to quaternions
        this.startQuaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), this.start.normalize());
        this.endQuaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), this.end.normalize());
    }

    getPoint(t: number) {
        const interpolatedQuaternion = new THREE.Quaternion().slerp(this.startQuaternion, t);
        const result = this.start.clone().applyQuaternion(interpolatedQuaternion);
        return result;
    }
}

// export class LineCurve extends THREE.Curve<THREE.Vector3> {
//     start = new THREE.Vector3();
//     end = new THREE.Vector3();

//     constructor(start: THREE.Vector3, end: THREE.Vector3) {
//         super();
//         this.start = start;
//         this.end = end;
//     }

//     getPoint(t: number): THREE.Vector3 {
//         return new THREE.Vector3().lerpVectors(this.start, this.end, t);
//     }
// }

export class EllipseAroundPointCurve extends THREE.Curve<THREE.Vector3> {
    center: THREE.Vector3;
    xRadius: number;
    yRadius: number;
    ellipseCurve: THREE.EllipseCurve;

    constructor(start: THREE.Vector3, end: THREE.Vector3) {
        super();
        // !: Hardcoded
        this.center = new THREE.Vector3(0, 10, 0);
        this.xRadius = 80;
        this.yRadius = 60;

        // Initialize the EllipseCurve with the given parameters
        this.ellipseCurve = new THREE.EllipseCurve(this.center.x, this.center.y, this.xRadius, this.yRadius, 0, 2 * Math.PI, false);
    }

    getPoint(t: number): THREE.Vector3 {
        const point2D = this.ellipseCurve.getPoint(t);
        return new THREE.Vector3(point2D.x, this.center.y, point2D.y);
    }
}
