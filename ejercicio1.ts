class UserProfile {
    private _username!: string;
    private _email!: string;
    private _password!: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("El nombre de usuario no puede estar vacío.");
        }
        this._username = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        if (!value.includes("@")) {
            throw new Error("El email no es válido, debe contener '@'.");
        }
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        if (value.length <= 8) {
            throw new Error("La contraseña debe tener más de 8 caracteres.");
        }
        this._password = value;
    }

    public displayProfile(): void {
        console.log(`Username: ${this._username}`);
        console.log(`Email: ${this._email}`);
    }
}

interface IProfileExporter {
    export(profile: UserProfile): void;
}

class JsonProfileExporter implements IProfileExporter {
    public export(profile: UserProfile): void {
        const json = JSON.stringify({
            username: profile.username,
            email: profile.email,
        });

        console.log("Export JSON:");
        console.log(json);
    }
}

class XmlProfileExporter implements IProfileExporter {
    public export(profile: UserProfile): void {
        const xml = `
<user>
    <username>${profile.username}</username>
    <email>${profile.email}</email>
</user>`.trim();

        console.log("Export XML:");
        console.log(xml);
    }
}

// Ejemplo de uso

const user = new UserProfile("juan123", "juan@example.com", "supersegura123");

user.displayProfile();

const jsonExporter = new JsonProfileExporter();
const xmlExporter = new XmlProfileExporter();

jsonExporter.export(user);
xmlExporter.export(user);
