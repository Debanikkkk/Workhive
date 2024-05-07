import { AppDataSource } from "data-source";
import { Skill } from "entity/Skill";
import { ReqSkill } from "src/models/req/ReqSkill";
import { ResSkill } from "src/models/res/ResSkill";
import { Body, Controller, Get, Post, Route, Tags } from "tsoa";
@Route('/skill')
@Tags('Skills')
export class SkillsController extends Controller{
    private skillsrepository=AppDataSource.getRepository(Skill)

    @Get()
    public async getSkills(): Promise<ResSkill[]>{
        const skills=await this.skillsrepository.find()

        const skillArr: ResSkill[]=[]

        for(const skill of skills){
            skillArr.push({
                id: skill.id,
                name: skill.name
            })
        }   

        return skillArr
    }
@Post()
public async saveSkill(@Body() request: ReqSkill): Promise<ResSkill>{
    const {name}=request

    const skillsave: Skill={
        name: name
    }

    const skillSaver=Object.assign(new Skill(), skillsave)
    const savedSkill=await this.skillsrepository.save(skillSaver)

    const resSkill: ResSkill={
        id: savedSkill.id,
        name: savedSkill.name
    }
    return resSkill
}
}