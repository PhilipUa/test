import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return 'test';
  }

  @Get()
  findAll() {
    return 'test';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'test';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return 'test';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'test';
  }
}
