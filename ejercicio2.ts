abstract class Notification {

    constructor(
        protected recipient: string,
        protected message: string
    ) {}

    abstract send(): void;
}

class EmailNotification extends Notification {
    public send(): void {
        console.log(`Enviando EMAIL a ${this.recipient}: ${this.message}`);
    }
}

class SmsNotification extends Notification {
    public send(): void {
        console.log(`Enviando SMS a ${this.recipient}: ${this.message}`);
    }
}

class PushNotification extends Notification {
    public send(): void {
        console.log(`Enviando PUSH a ${this.recipient}: ${this.message}`);
    }
}

class NotificationService {
    public sendBatch(notifications: Notification[]): void {
        for (const notification of notifications) {
            notification.send();
        }
    }
}

// Ejemplo de uso

const notifications: Notification[] = [
    new EmailNotification("juan@example.com", "Bienvenido a la plataforma 🎉"),
    new SmsNotification("+5491112345678", "Tu código de verificación es 123456"),
    new PushNotification("user_123", "Tienes un nuevo mensaje")
];

const notificationService = new NotificationService();

notificationService.sendBatch(notifications);
