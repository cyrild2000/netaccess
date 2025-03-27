export interface UserI {
    id: string,
    firstName: string,
    lastName: string
}

export interface DepartmentI {
    id: string,
    name: string
}

export interface DoorI {
    id: string,
    name: string
}

export interface BadgeI {
    id?: string,
    tokenType: string,
    tokenValue: string,
    isLost: boolean
}