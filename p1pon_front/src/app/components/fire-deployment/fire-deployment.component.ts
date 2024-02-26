import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as PF from 'pathfinding';
import { Observable, of } from 'rxjs';
import { RobotService } from '../../services/robot.service';
import { Robot } from '../robots/robots-interface';
import { MatSnackBar } from '@angular/material/snack-bar';


const COLORS = ["ivory", "limegreen", "red", "lightgrey", "limegreen"];

@Component({
  selector: 'app-forest-simulator',
  templateUrl: './fire-deployment.component.html',
  styles: [`
    canvas {
      border: 1px solid #ccc;
    }
  `]
})
export class FireDeploymentComponent implements OnInit {
  robot!: Robot;
  constructor(private robotService: RobotService, private snackBar: MatSnackBar) { }

  @ViewChild('forestCanvas', { static: true }) canvasRef!: ElementRef;

  private ctx: CanvasRenderingContext2D | null = null;
  private fire = false;
  private burned = false;
  private delay: number = 100;
  private unit: number = 4;
  private n: number = 800;
  private obstacleDensity: number = 0.1;
  private states: number[][] = [];
  private fireStationImageUrl: string = 'https://api.iconify.design/material-symbols:home.svg';
  private fireStations: { x: number, y: number }[] = [];
  private finder = new PF.AStarFinder();
  startNode: { x: number; y: number } = { x: Infinity, y: 0 };
  endNode: { x: number; y: number } = { x: Infinity, y: 0 };
  originalColors: any;
  robotMoving: boolean = false;
  fireCoordinates: { x: number; y: number; }[] = [];
  burnedAreas: { x: number; y: number; }[] = [];
  closestStation: { x: number; y: number; } = { x: Infinity, y: 0 };
  repairRobotMoving: boolean = false;
  sortedBurnedAreas: { x: number; y: number; }[] = [];

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'f') {
      this.robotService.getRobotById(Math.random() < 0.5 ? 1 : 3).subscribe((robot: Robot) => {
        this.robot = robot;
        this.startRandomFire();
      });
    }
    if (event.key === 'r') {
      this.burned = true;
      this.robotService.getRobotById(2).subscribe((robot: Robot) => {
        this.robot = robot;
        this.movetoNextBurned();
      });
    }
    if (event.key === 's') {
      this.robotService.getRobotById(1).subscribe((robot: any) => {
        console.log(robot);
      });
    }
  }

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d', {
      willReadFrequently: true
    });
    // Liste de toutes vos images
    const images = ['test.png', 'test2.png', 'test3.png', 'test4.png'];
    // Sélectionnez une image au hasard à partir de la liste
    const randomImage = images[Math.floor(Math.random() * images.length)];
    this.loadImage(`../assets/images/${randomImage}`);
    this.canvasRef.nativeElement.addEventListener('click', this.handleCanvasClick.bind(this));
  }


  startRandomFire() {
    // Choisissez un emplacement aléatoire sur la carte
    const randomX = Math.floor(Math.random() * this.canvasRef.nativeElement.width);
    const randomY = Math.floor(Math.random() * this.canvasRef.nativeElement.height);

    // Créez un faux événement de souris avec ces coordonnées
    const fakeMouseEvent = new MouseEvent('click', {
      clientX: randomX + this.canvasRef.nativeElement.getBoundingClientRect().left,
      clientY: randomY + this.canvasRef.nativeElement.getBoundingClientRect().top
    });
    // Déclenche un feu à cet emplacement
    this.handleCanvasClick(fakeMouseEvent);
  }

  // CreateForest
  loadImage(imageUrl: string): void {
    const img = new Image();
    img.onload = () => {
      this.createForestFromImage(img);
      this.fill(this.ctx!, this.states, this.unit);
    };

    img.src = imageUrl;
  }
  getDominantColor(pixelData: Uint8ClampedArray): string {
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];

    if (r > g && r > b) {
      return 'grey';
    } else if (g > r && g > b) {
      return 'green';
    } else if (b > r && b > g) {
      return 'blue';
    } else {
      return 'yellow';
    }
  }
  createForestFromImage(img: HTMLImageElement): void {
    this.states = Array.from({ length: this.n }, () => Array(this.n).fill(0));

    this.canvasRef.nativeElement.width = img.width;
    this.canvasRef.nativeElement.height = img.height;


    this.ctx?.drawImage(img, 0, 0, img.width, img.height);

    for (let y = 0; y < img.height; y += this.unit) {
      for (let x = 0; x < img.width; x += this.unit) {
        const color = this.getDominantColor(this.ctx!.getImageData(x, y, this.unit, this.unit).data);
        const isObstacle = Math.random() < this.obstacleDensity;

        if (color === 'blue') {
          this.states[y / this.unit][x / this.unit] = -1; // -1 represents an obstacle
        } else if (isObstacle) {
          // Place the obstacle
          this.states[y / this.unit][x / this.unit] = -2; // -2 represents an obstacle

          // Place a random number of blocks (between 24 and 52) around the obstacle
          const numBlocks = Math.floor(Math.random() * (52 - 24 + 1)) + 24;
          for (let k = 0; k < numBlocks; k++) {
            const i = Math.floor(Math.random() * 3) - 1; // Random number between -1 and 1
            const j = Math.floor(Math.random() * 3) - 1; // Random number between -1 and 1

            const offsetX = x + i * this.unit;
            const offsetY = y + j * this.unit;

            if (
              offsetX >= 0 &&
              offsetY >= 0 &&
              offsetX < img.width &&
              offsetY < img.height &&
              Math.random() < this.obstacleDensity
            ) {
              this.states[offsetY / this.unit][offsetX / this.unit] = -2; // -2 represents an obstacle
            }
          }
        }
        else if (color === 'grey') {
          this.states[y / this.unit][x / this.unit] = -3; // -3 represents an obstacle
        } else {
          this.states[y / this.unit][x / this.unit] = color === 'green' ? 1 : 0; // 1 represents a tree
        }
      }
    }
    this.fireStations.push({ x: 98, y: 141 });
    this.fireStations.push({ x: 230, y: 163 });
    this.fireStations.push({ x: 206, y: 108 });
    this.fireStations.push({ x: 374, y: 110 });
    this.fireStations.forEach(station => {
      this.fillFireStation(station.x, station.y);
    });
  }

  fill(ctx: CanvasRenderingContext2D, states: number[][], unit: number) {
    const n = states.length;
    for (let line = 0; line < n; line++) {
      for (let col = 0; col < n; col++) {
        this.fillCell(ctx, states, line, col, unit);
      }
    }
  }

  fillCell(ctx: CanvasRenderingContext2D, states: number[][], line: number, col: number, unit: number) {
    const A = [unit * col, unit * line];
    const B = [unit * (col + 1), unit * (line + 1)];
    const state = states[line][col];
    const color = state === -1 ? 'blue' : state === -2 ? 'grey' : state === -3 ? 'white' : COLORS[state];

    ctx.fillStyle = color;
    ctx.fillRect(A[0], A[1], B[0] - A[0], B[1] - A[1]);
  }

  // Click
  handleCanvasClick(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Convertir les coordonnées du clic en indices de matrice
    const clickedCol = Math.floor(mouseX / this.unit);
    const clickedLine = Math.floor(mouseY / this.unit);
    if (this.states[clickedLine][clickedCol] === 1) {
      this.fire = true;
      this.snackBar.open('Le feu a été lancé', 'OK', {
        duration: 2000,
      });

      // Mettre le feu à l'endroit du clic
      if (clickedCol >= 0 && clickedCol < this.n && clickedLine >= 0 && clickedLine < this.n) {
        this.states[clickedLine][clickedCol] = 2;
      }
      this.startNode = this.findClosestFireStation(clickedCol, clickedLine);
      this.robotMoving = false;
      this.robotService.getRobotById(Math.random() < 0.5 ? 1 : 3).subscribe((robot: Robot) => {
        this.robot = robot;
        console.log(this.robot.data.id);

        this.propagate();
      });
    } else {
      this.snackBar.open('Aucun feu declenché, veuillez cliquer sur un arbre pour déclencher un feu', 'OK', {
        duration: 2000,
      });
    }
  }


  // Propagate
  propagate() {
    this.updateStates(this.states);
    this.fillFire(this.ctx!, this.states, this.unit);
    if (this.fire) {
      if (this.robotMoving == false) {
        this.moveToNextFire();
      }
      setTimeout(() => this.propagate(), this.delay);
    } else if (this.burned) {
      this.fill(this.ctx!, this.states, this.unit);
      this.startNode = this.closestStation;
      // this.movetoNextBurned()
    } else {
      this.robotMoving = true;
      this.startNode = { x: Infinity, y: 0 };
    }
  }

  moveToNextFire() {
    if (this.fireCoordinates.length > 0) {
      // Calculer la distance entre le robot et chaque feu
      const distances = this.fireCoordinates.map(fireCoordinate => {
        const dx = this.startNode.x - fireCoordinate.x;
        const dy = this.startNode.y - fireCoordinate.y;
        return Math.sqrt(dx * dx + dy * dy);
      });
      if(this.fireCoordinates.length > 25){
        this.sendAnotherRobot();
      }

      // Trouver l'index du feu le plus proche
      const closestFireIndex = distances.indexOf(Math.min(...distances));

      // Prendre le feu le plus proche
      const fireCoordinate = this.fireCoordinates.splice(closestFireIndex, 1)[0];

      if (fireCoordinate) {
        const path = this.findPath(this.startNode, fireCoordinate);
        if (path) {
          this.moveRobotAlongPath(this.ctx!, path, this.robot);
        }
      }
    }
  }
  
  sendAnotherRobot() {
    this.robotService.getRobotById(3).subscribe((robot: Robot) => {
      this.robot = robot;
      this.robotMoving = false;
      this.moveToNextFire();
    });
  }


  findBurnedAreas(): { x: number, y: number }[] {
    this.burnedAreas = [];
    const n = this.states.length;
    for (let line = 0; line < n; line++) {
      for (let col = 0; col < n; col++) {
        if (this.states[line][col] === 3) {
          this.burnedAreas.push({ x: col, y: line });
        }
      }
    }
    return this.burnedAreas;
  }

  movetoNextBurned() {
    this.burnedAreas = this.findBurnedAreas();
    const distances = this.burnedAreas.map(burnedArea => {
      const dx = this.startNode.x - burnedArea.x;
      const dy = this.startNode.y - burnedArea.y;
      return Math.sqrt(dx * dx + dy * dy);
    });
    // Trouver l'index du feu le plus proche
    const closestBurnedAreaIndex = distances.indexOf(Math.min(...distances));
    // Prendre le brulé le plus proche
    const burnedArea = this.burnedAreas.splice(closestBurnedAreaIndex, 1)[0];
    if (burnedArea) {
      let repairPath = this.findPath(this.startNode, burnedArea);
      if (repairPath) {
        this.moveRobotAlongPath(this.ctx!, repairPath, this.robot);
      }
    } else {
      this.burned = false;
      this.fill(this.ctx!, this.states, this.unit);
      this.fireStations.forEach(station => {
        this.fillFireStation(station.x, station.y);
      });
    }
  }

  updateStates(states: number[][]) {
    const n = states.length;
    const toFire: number[][] = [];

    for (let line = 0; line < n; line++) {
      for (let col = 0; col < n; col++) {
        if (states[line][col] === 2) {
          states[line][col] = 3;

          // Update states in a circular pattern
          this.neighborsCircular(n, line, col).forEach(([i, j]) => {
            if (states[i][j] === 1) {
              toFire.push([i, j]);
            }
          });
        }
      }
    }
    toFire.forEach(([line, col]) => states[line][col] = 2);
    if (toFire.length === 0) {
      this.fire = false;
    }
  }
  neighborsCircular(n: number, i: number, j: number): number[][] {
    const radius = 1; // Adjust the radius as needed
    const neighbors: number[][] = [];

    for (let x = -radius; x <= radius; x++) {
      for (let y = -radius; y <= radius; y++) {
        const distance = Math.sqrt(x * x + y * y);
        if (distance <= radius && i + x >= 0 && i + x < n && j + y >= 0 && j + y < n) {
          neighbors.push([i + x, j + y]);
        }
      }
    }

    return neighbors;
  }

  fillFire(ctx: CanvasRenderingContext2D, states: number[][], unit: number) {
    this.fireCoordinates = [];
    const n = states.length;

    for (let line = 0; line < n; line++) {
      for (let col = 0; col < n; col++) {
        const cellState = states[line][col];

        if (cellState === 2 || cellState === 3) {
          this.fillCell(ctx, states, line, col, unit);
          this.burned = true;
          if (cellState === 2) {
            this.fireCoordinates.push({ x: col, y: line });
          }
        }
      }
    }

    this.fireStations.forEach(station => {
      this.fillFireStation(station.x, station.y);
    });
  }

  fillFireStation(x: number, y: number): void {
    const fireStationImage = new Image();
    fireStationImage.onload = () => {
      const stationX = x * this.unit; // Convertir les coordonnées en pixels
      const stationY = y * this.unit;

      this.ctx?.drawImage(fireStationImage, stationX, stationY, 30, 30); // Utiliser la taille du carré
    };

    fireStationImage.src = this.fireStationImageUrl;
  }
  findClosestFireStation(x: number, y: number): { x: number, y: number } {
    let closestStation = { x: Infinity, y: 0 };
    let closestDistance = Infinity;

    this.fireStations.forEach(station => {
      const dx = station.x - x;
      const dy = station.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestStation = station;
        closestDistance = distance;
      }
    });
    this.closestStation = closestStation;
    return closestStation;
  }

  findPathToNearestFireStation(start: { x: number, y: number }): number[][] | null {
    // Trier les stations de pompiers par distance croissante
    const sortedStations = this.fireStations.slice().sort((a, b) => {
      const distA = Math.hypot(a.x - start.x, a.y - start.y);
      const distB = Math.hypot(b.x - start.x, b.y - start.y);
      return distA - distB;
    });

    // Essayer de trouver un chemin vers chaque station de pompiers
    for (const station of sortedStations) {
      const path = this.findPath(start, station);
      if (path.length > 0) {
        return path;
      }
    }

    return null; // Aucun chemin trouvé vers aucune station de pompiers
  }

  findPath(start: { x: number, y: number }, end: { x: number, y: number }): number[][] {
    const height = this.states.length;
    const width = this.states[0].length;
    const gridData = new Array(height).fill(0).map(() => new Array(width).fill(0));

    // Marquer les obstacles dans la grille
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.states[y][x] < 0) { // Si l'état est -2, c'est un obstacle
          gridData[y][x] = 1; // Dans la bibliothèque pathfinding, 1 signifie un obstacle
        }
      }
    }

    const grid = new PF.Grid(gridData);
    const path = this.finder.findPath(start.x, start.y, end.x, end.y, grid.clone());

    if (path.length === 0) {
      const newPath = this.findPathToNearestFireStation(start);
      if (newPath) {
        return newPath;
      } else {
        console.log("No path to any fire station found.");
      }
    }

    return path;
  }


  moveRobotAlongPath(ctx: CanvasRenderingContext2D, path: number[][], robot: Robot): void {
    this.robotMoving = true;
    const robotIcon = new Image();
    const moveDelay = 0; // Adjust the move delay in milliseconds as needed

    let currentIndex = 0;
    const totalSteps = path.length;

    const moveRobotStep = () => {
      for (let i = 0; i < robot.data.speed && currentIndex < totalSteps; i++) {
        const [px, py] = path[currentIndex];
        const robotX = px * this.unit;
        const robotY = py * this.unit;

        // Effacer l'icône du robot à la position précédente
        if (robot.data.id == 1) {
          ctx.fillStyle = '#5c2c06';
        }
        else if (robot.data.id == 3) {
          ctx.fillStyle = 'pink';
        } else {
          ctx.fillStyle = '#4dacc4';
        }
        this.states[py][px] = 4;

        ctx.fillRect(
          this.startNode.x * this.unit,
          this.startNode.y * this.unit,
          this.unit,
          this.unit
        );

        // Dessiner l'icône du robot à la nouvelle position
        ctx.drawImage(robotIcon, robotX, robotY, this.unit, this.unit);

        // Mettre à jour les coordonnées du robot
        this.startNode = { x: px, y: py };
        currentIndex++;
      }

      // Répéter l'animation si le robot n'a pas atteint la fin du chemin
      if (currentIndex < totalSteps) {
        setTimeout(() => {
          requestAnimationFrame(moveRobotStep);
        }, moveDelay);
      } else {
        this.robotMoving = false;
        if (robot.data.id == 1 || robot.data.id == 3) {
          this.moveToNextFire();
        } else {
          this.movetoNextBurned();
        }
      }
    };
    // Démarrer l'animation
    moveRobotStep();
  }
}
