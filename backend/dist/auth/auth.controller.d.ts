import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from '../dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            role: import("../schemas/user.schema").UserRole;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            role: import("../schemas/user.schema").UserRole;
        };
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: unknown;
            name: string;
            email: string;
            role: import("../schemas/user.schema").UserRole;
        };
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
        id: any;
        name: any;
        email: any;
        role: any;
        phone: any;
        address: any;
        lastLoginAt: any;
    }>;
}
