import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('CSRF')
@Controller('csrf-token')
export class CsrfController {
  @Get()
  @ApiOperation({ summary: 'Get CSRF token' })
  @ApiResponse({ 
    status: 200, 
    description: 'CSRF token retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        csrfToken: { type: 'string' }
      }
    }
  })
  getCsrfToken(@Res() res: Response) {
    // The CSRF token is automatically set in cookies by the csurf middleware
    // We just need to return a success response
    res.json({ 
      csrfToken: 'token-set-in-cookie',
      message: 'CSRF token set in cookie'
    });
  }
}
