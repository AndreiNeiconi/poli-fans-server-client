import {  Controller, Get, Param, Post, Put, Query,Delete,HttpCode,HttpStatus, UseGuards, Req, Body } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfilesDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) { }
    @Get()
    @UseGuards(AuthGuard)
    async getProfile(@Req() req: any) {
        
        const userId = req.user.id;
        return this.profilesService.getProfile(userId);
    }
    @Put()
    @UseGuards(AuthGuard)
    async updateProfile(@Req() req:any,@Body() updateData:any) {
        const userId = req.user.id;

        return this.updateProfile(userId, updateData);

    


    }



}
