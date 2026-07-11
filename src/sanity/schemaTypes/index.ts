import { blockContentType } from './blockContentType';
import { logType } from './logType';
import { courseType, courseProjectType } from './courseType';
import { pipelineTopicType, pipelineThreadType } from './pipelineTopicType';

export const schemaTypes = [
  // Documents
  logType,
  courseType,
  pipelineTopicType,
  // Objects
  blockContentType,
  courseProjectType,
  pipelineThreadType,
];
