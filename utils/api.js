import {http} from './http'

function courses(params){
    http('/courses','GET',params)
}

function course(course_id,params){
    http('/courses/'+course_id,'GET',params)
}

function resource(course_id,resource_id,params){
    http('/courses/'+course_id+'/resource/'+resource_id,'GET',params)
}

export default{
    courses,
    course,
    resource
}