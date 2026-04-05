import { Body, Controller, Get, Param, Post, Put, Query,Delete,HttpCode,HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfilesDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
    @Get()
    findeAll(@Query('age') age: number) {
        return [{ age }];
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id };
    }
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return {
            name: createProfileDto.name,
            description: createProfileDto.description
};
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfilesDto) {
        return {
            id,
            name: updateProfileDto.name,
            description: updateProfileDto.description
        };
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) { }

}
