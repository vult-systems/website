import { blockContentType } from './blockContentType';
import { logType } from './logType';
import { courseType, courseProjectType, courseProjectThreadType } from './courseType';
import { pipelineTopicType, pipelineThreadType } from './pipelineTopicType';
import { learnPageType } from './learnPageType';

export const schemaTypes = [
  // Documents
  logType,
  courseType,
  pipelineTopicType,
  learnPageType,
  // Objects
  blockContentType,
  courseProjectType,
  courseProjectThreadType,
  pipelineThreadType,
];
