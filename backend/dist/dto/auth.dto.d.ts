export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
