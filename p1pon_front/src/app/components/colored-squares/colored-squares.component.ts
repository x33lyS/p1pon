import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as PF from 'pathfinding';

@Component({
  selector: 'app-colored-squares',
  template: '<canvas #canvas width="100%" height="100%"></canvas>',
  styles: [],
})
export class ColoredSquaresComponent implements OnInit {
  @ViewChild('canvas') canvasRef!: ElementRef;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  isFirstClick = true;
  firstClickCoordinates: { x: number; y: number } | null = null;

  startNode: { x: number; y: number } = { x: 0, y: 0 };
  endNode: { x: number; y: number } = { x: 0, y: 0 };

  grid: string[][] = []; // To store the colors of each grid cell
  path: number[][] = []; // To store the current path

  originalColors: string[][] = [];

  ngOnInit(): void {
    this.loadImage('../assets/images/map.png');
  }

  loadImage(imageUrl: string): void {
    const img = new Image();
    img.onload = () => {
      this.createColoredSquares(img);
      this.addClickListener();
    };

    img.src = imageUrl;
  }

  // createGrid(): PF.Grid {
  //   const matrix = this.grid.map((row) =>
  //     row.map((cell) => {
  //       if (cell === 'blue') {
  //         return 1; // Obstacles
  //       } else {
  //         return 0; // Chemin possible
  //       }
  //     })
  //   );
  //   return new PF.Grid(matrix);
  // }

  createColoredSquares(img: HTMLImageElement): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = img.width;
    this.canvas.height = img.height;

    this.ctx.drawImage(img, 0, 0, img.width, img.height);

    const squareSize = 10;

    for (let y = 0; y < img.height; y += squareSize) {
      const row: string[] = [];
      for (let x = 0; x < img.width; x += squareSize) {
        const index = (y * img.width + x) * 4;
        const color = this.getDominantColor(
          this.ctx.getImageData(x, y, squareSize, squareSize).data
        );

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, squareSize, squareSize);

        row.push(color);
      }
      this.grid.push(row);
      this.originalColors.push([...row]);
    }
    // Placer l'icône du robot aux coordonnées de la grille (160, 23)
    this.startNode = { x: 160, y: 23 };
    this.loadRobotIcon();
  }

  getDominantColor(pixelData: Uint8ClampedArray): string {
    const [r, g, b] = pixelData;

    if (r > g && r > b) {
      return 'grey';
    } else if (g > r && g > b) {
      return 'green';
    } else if (b > r && b > g) {
      return 'blue';
    } else if (b === 0 && r === 0 && g === 0) {
      return 'black';
    } else {
      return 'grey';
    }
  }

  findAndDrawPath(): void {
    if (this.startNode && this.endNode) {
      // this.path = this.findPath(
      //   this.startNode.x,
      //   this.startNode.y,
      //   this.endNode.x,
      //   this.endNode.y
      // );
      console.log('path', this.path);

      if (this.path && this.path.length > 0) {
        this.drawPath(this.path);
        this.moveRobotAlongPath();
      }
    }
  }

  loadRobotIcon(): void {
    const robotIcon = new Image();
    const squareSize = 10;

    robotIcon.onload = () => {
      const robotX = this.startNode.x * squareSize; // Convertissez les coordonnées en pixels
      const robotY = this.startNode.y * squareSize;

      this.ctx.drawImage(robotIcon, robotX, robotY, 30, 30); // Utilisez la taille du carré
    };

    robotIcon.src = 'https://api.iconify.design/material-symbols:robot-2.svg';
  }

  addClickListener(): void {
    this.canvas.addEventListener('click', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const canvasMaxX = this.canvas.width / 10 - 1;
      const canvasMaxY = this.canvas.height / 10 - 1;

      // Calculez les coordonnées en les contraignant à rester dans les limites du canvas
      let x = Math.floor((event.clientX - rect.left) / 10);
      let y = Math.floor((event.clientY - rect.top) / 10);

      x = Math.min(Math.max(0, x), canvasMaxX);
      y = Math.min(Math.max(0, y), canvasMaxY);

      if (this.isFirstClick) {
        this.startNode = { x, y };
        console.log('startNode', this.startNode);

        this.isFirstClick = false;
      } else {
        this.endNode = { x, y };
        this.isFirstClick = true;

        // Vérifiez si startNode et endNode sont définis avant de trouver et de dessiner le chemin
        if (this.startNode && this.endNode) {
          // this.path = this.findPath(
          //   this.startNode.x,
          //   this.startNode.y,
          //   this.endNode.x,
          //   this.endNode.y
          // );
          this.drawPath(this.path);
          this.moveRobotAlongPath();
        }
      }
    });
  }

  drawPath(path: number[][]): void {
    if (path.length === 0) return;

    this.ctx.beginPath();
    this.ctx.moveTo(path[0][0] * 10, path[0][1] * 10);

    for (const [px, py] of path) {
      this.ctx.lineTo(px * 10, py * 10);
    }

    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  moveRobotAlongPath(): void {
    const squareSize = 10;
    let currentIndex = 0;

    const robotIcon = new Image();
    robotIcon.src = 'https://api.iconify.design/material-symbols:robot-2.svg';

    const moveRobot = () => {
      if (currentIndex < this.path.length) {
        const [px, py] = this.path[currentIndex];
        const robotX = px * squareSize;
        const robotY = py * squareSize;

        // Effacer l'icône du robot à la position précédente
        this.ctx.clearRect(
          this.startNode.x * squareSize,
          this.startNode.y * squareSize,
          30,
          30
        );

        // Redessiner chaque case avec sa couleur d'origine
        for (let y = 0; y < this.originalColors.length; y++) {
          for (let x = 0; x < this.originalColors[y].length; x++) {
            const color = this.originalColors[y][x];
            this.ctx.fillStyle = color;
            this.ctx.fillRect(
              x * squareSize,
              y * squareSize,
              squareSize,
              squareSize
            );
          }
        }

        // Dessiner l'icône du robot à la nouvelle position
        this.ctx.drawImage(robotIcon, robotX, robotY, 30, 30);

        // Mettre à jour les coordonnées du robot
        this.startNode = { x: px, y: py };

        currentIndex++;

        // Répéter l'animation à la prochaine frame
        requestAnimationFrame(moveRobot);
      }
    };

    // Démarrer l'animation
    moveRobot();
  }

  getColorFromData(data: Uint8ClampedArray): string {
    const [r, g, b] = data;

    if (r === 0 && g === 0 && b === 0) {
      return 'black';
    } else if (r === 0 && g > 0 && b === 0) {
      return 'green';
    } else if (r === 0 && g === 0 && b > 0) {
      return 'blue';
    } else {
      return 'grey';
    }
  }

  // findPath(
  //   startX: number,
  //   startY: number,
  //   endX: number,
  //   endY: number
  // ): number[][] {
  //   // const grid = this.createGrid();
  //   const finder = new PF.AStarFinder();
  //   // return finder.findPath(startX, startY, endX, endY, grid.clone());
  // }

  getNeighbors(node: { x: number; y: number }): { x: number; y: number }[] {
    let neighbors: { x: number; y: number }[] = [];

    // Directions: Haut, Droit, Bas, Gauche
    const directions = [
      { dx: 0, dy: -1 }, // Haut
      { dx: 1, dy: 0 }, // Droit
      { dx: 0, dy: 1 }, // Bas
      { dx: -1, dy: 0 }, // Gauche
    ];

    directions.forEach((dir) => {
      const newX = node.x + dir.dx;
      const newY = node.y + dir.dy;

      // Vérifiez si le nouveau nœud est accessible
      if (
        newX >= 0 &&
        newX < this.canvas.width / 10 &&
        newY >= 0 &&
        newY < this.canvas.height / 10
      ) {
        neighbors.push({ x: newX, y: newY });
      }
    });

    return neighbors;
  }
}
