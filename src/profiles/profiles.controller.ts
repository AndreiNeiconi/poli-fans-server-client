import { Body, Controller, Get, Param, Post, Put, Query,Delete,HttpCode,HttpStatus, UseGuards, Req } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfilesDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }
    @Get('profiles')
    @UseGuards(AuthGuard)
    async getProfile(@Req() req: any) {
        
        const userId = req.user.id;
        return this.profilesService.getProfile(userId);
    }


}
