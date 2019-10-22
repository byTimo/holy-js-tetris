import { PoseDetectorBase } from "./PoseDetectorBase";
import { Emitter } from "./Emitter";
import { Pose } from "@tensorflow-models/posenet";

export type Part = "nose"
    | "leftEye"
    | "rightEye"
    | "leftEar"
    | "rightEar"
    | "leftShoulder"
    | "rightShoulder"
    | "leftElbow"
    | "rightElbow"
    | "leftWrist"
    | "rightWrist"
    | "leftHip"
    | "rightHip"
    | "leftKnee"
    | "rightKnee"
    | "leftAnkle"
    | "rightAnkle"

export type Keypoints = { [K in Part]: { score: number, x: number, y: number, saved: boolean } }

export interface EstimatedPose {
    score: number;
    keypoints: Keypoints;
}

export interface EstimatorConfig {
    deadZoneRadious: number;
}

export class PoseEstimator extends Emitter<EstimatedPose[]> {
    private saved: EstimatedPose = {
        score: 0,
        keypoints: {
            "nose": { x: 0, y: 0, score: 0, saved: true },
            "leftEye": { x: 0, y: 0, score: 0, saved: true },
            "rightEye": { x: 0, y: 0, score: 0, saved: true },
            "leftEar": { x: 0, y: 0, score: 0, saved: true },
            "rightEar": { x: 0, y: 0, score: 0, saved: true },
            "leftShoulder": { x: 0, y: 0, score: 0, saved: true },
            "rightShoulder": { x: 0, y: 0, score: 0, saved: true },
            "leftElbow": { x: 0, y: 0, score: 0, saved: true },
            "rightElbow": { x: 0, y: 0, score: 0, saved: true },
            "leftWrist": { x: 0, y: 0, score: 0, saved: true },
            "rightWrist": { x: 0, y: 0, score: 0, saved: true },
            "leftHip": { x: 0, y: 0, score: 0, saved: true },
            "rightHip": { x: 0, y: 0, score: 0, saved: true },
            "leftKnee": { x: 0, y: 0, score: 0, saved: true },
            "rightKnee": { x: 0, y: 0, score: 0, saved: true },
            "leftAnkle": { x: 0, y: 0, score: 0, saved: true },
            "rightAnkle": { x: 0, y: 0, score: 0, saved: true },
        }
    }

    constructor(private detector: PoseDetectorBase, private config: EstimatorConfig) {
        super();
    }

    public start = () => {
        this.detector.register(this.handleDetect)
        this.detector.start();
    }

    public stop = () => {
        this.detector.stop();
        this.detector.unregister(this.handleDetect);
    }

    private handleDetect = (poses: Pose[]) => {
        const estimated = poses.map(this.estimate);
        this.emit(estimated);
    }

    private estimate = (pose: Pose): EstimatedPose => {
        const keypoints = this.esitmateExisting(pose);
        const next: EstimatedPose = {
            score: pose.score,
            keypoints: {
                ...this.saved.keypoints,
                ...keypoints
            }
        }

        this.saved = next;
        return next;
    }

    private esitmateExisting = (pose: Pose): Partial<Keypoints> => {
        const keypoints: Partial<Keypoints> = {};
        for (const keypoint of pose.keypoints) {
            const part = keypoint.part as Part;
            const saved = this.saved.keypoints[part];
            const distance = this.distance(saved.x, saved.y, keypoint.position.x, keypoint.position.y);
            keypoints[part] = distance <= this.config.deadZoneRadious
                ? { ...saved, saved: true }
                : { x: keypoint.position.x, y: keypoint.position.y, score: keypoint.score, saved: false };
        }
        return keypoints;
    }

    private distance = (x1: number, y1: number, x2: number, y2: number): number => {
        const dx = x2 - x1, dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
}