import { Body, Controller, Get, Param, Post, Put, Query,Delete,HttpCode,HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfilesDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {


}
