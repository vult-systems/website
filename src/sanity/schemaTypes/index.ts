import { blockContentType } from './blockContentType';
import { logType } from './logType';
import { courseType, courseProjectType, courseProjectThreadType } from './courseType';
import { pipelineTopicType, pipelineThreadType } from './pipelineTopicType';
import { learnPageType } from './learnPageType';
import { generatorType } from './generatorType';
import { referenceLinkType } from './referenceLinkType';

export const schemaTypes = [
  // Documents
  logType,
  courseType,
  pipelineTopicType,
  learnPageType,
  generatorType,
  // Objects
  blockContentType,
  courseProjectType,
  courseProjectThreadType,
  pipelineThreadType,
  referenceLinkType,
];
