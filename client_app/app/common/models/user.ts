export class User {
    id: number;
    firstName: string;
    lastName: string;

    location: Location;

    static decode(json: string): User {
        let user = Object.create(User.prototype);
        return Object.assign(user, json);
    }
}

export class Location {
    id: number;
    name: string;
    permissions: Permission[];
}

export class Permission {
    entity: string;
    level: string;
}