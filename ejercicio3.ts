/*
Si se modela este sistema solo con herencia, empezamos con algo simple como una clase base Character 
y subclases Warrior y Mage. Pero en cuanto queremos combinar habilidades, 
el diseño se rompe: para un guerrero que vuela necesitamos FlyingWarrior, 
para un mago que vuela FlyingMage, luego un guerrero que también lanza hechizos SpellWarrior,
 y si además vuela, FlyingSpellWarrior. Cada nueva combinación de capacidades implica crear una nueva subclase. 
 Esto genera una explosión de clases, donde la cantidad de clases crece de forma descontrolada, el código se vuelve difícil de mantener 
 y cualquier cambio en las reglas del juego implica tocar muchas clases diferentes.
*/

/*
Además, lenguajes como TypeScript no soportan bien la herencia múltiple, 
así que no podemos simplemente decir que un personaje herede a la vez de Warrior y de FlyingCharacter. 
Para compartir comportamientos como “puede volar” o “puede lanzar hechizos” terminamos duplicando código 
o creando jerarquías forzadas y confusas, lo que viola principios como el de responsabilidad única. 
En resumen, la herencia por sí sola no se adapta bien cuando los personajes se definen por combinaciones flexibles de comportamientos, 
en vez de por una única cadena rígida de tipos.
*/


// Ataque
interface IAttackBehavior {
    attack(): void;
}

// Movimiento
interface IMovementBehavior {
    move(): void;
}

// Implementaciones de ataque
class SwordAttack implements IAttackBehavior {
    attack(): void {
        console.log("Ataca con una espada");
    }
}

class MagicAttack implements IAttackBehavior {
    attack(): void {
        console.log("Lanza un hechizo mágico");
    }
}

// Implementaciones de movimiento
class WalkingMovement implements IMovementBehavior {
    move(): void {
        console.log("Camina sobre el terreno");
    }
}

class FlyingMovement implements IMovementBehavior {
    move(): void {
        console.log("Vuela por los aires");
    }
}

// Clase Character usando composición
class Character {

    constructor(
        private name: string,
        private attackBehavior: IAttackBehavior,
        private movementBehavior: IMovementBehavior
    ) {}

    public performAttack(): void {
        console.log(`[${this.name}]`, "se prepara para atacar...");
        this.attackBehavior.attack();
    }

    public performMove(): void {
        console.log(`[${this.name}]`, "se mueve...");
        this.movementBehavior.move();
    }

    // Además podemos cambiar los comportamientos en tiempo de ejecución
    public setAttackBehavior(attackBehavior: IAttackBehavior): void {
        this.attackBehavior = attackBehavior;
    }

    public setMovementBehavior(movementBehavior: IMovementBehavior): void {
        this.movementBehavior = movementBehavior;
    }
}

// Ejemplos de uso

// Guerrero volador: SwordAttack + FlyingMovement
const flyingWarrior = new Character(
    "Guerrero volador",
    new SwordAttack(),
    new FlyingMovement()
);

flyingWarrior.performAttack();
flyingWarrior.performMove();

// Mago caminante: MagicAttack + WalkingMovement
const walkingMage = new Character(
    "Mago caminante",
    new MagicAttack(),
    new WalkingMovement()
);

walkingMage.performAttack();
walkingMage.performMove();

// Cambiar el comportamiento en tiempo de ejecución
// Ej: el mago aprende a volar
walkingMage.setMovementBehavior(new FlyingMovement());
walkingMage.performMove();   // Ahora vuela