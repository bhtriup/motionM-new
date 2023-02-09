import {Controller, Get, Render} from '@nestjs/common';
import {OrganizationService} from "./organization.service";

@Controller('org')
export class OrganizationController {
  constructor(private orgService: OrganizationService) {}

  @Get()
  @Render('pages/member/member')
  index() {

  }
}
