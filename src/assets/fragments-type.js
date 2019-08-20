export const introspectionQueryResultData = {
  __schema: {
    types: [
      {
        name: 'Repository',
        kind: 'OBJECT',
        description: 'A repository contains the content for a project.',
        fields: [
          {
            name: 'assignableUsers'
          },
          {
            name: 'branchProtectionRules'
          },
          {
            name: 'codeOfConduct'
          },
          {
            name: 'collaborators'
          },
          {
            name: 'commitComments'
          },
          {
            name: 'createdAt'
          },
          {
            name: 'databaseId'
          },
          {
            name: 'defaultBranchRef'
          },
          {
            name: 'deployKeys'
          },
          {
            name: 'deployments'
          },
          {
            name: 'description'
          },
          {
            name: 'descriptionHTML'
          },
          {
            name: 'diskUsage'
          },
          {
            name: 'forkCount'
          },
          {
            name: 'forks'
          },
          {
            name: 'hasIssuesEnabled'
          },
          {
            name: 'hasWikiEnabled'
          },
          {
            name: 'homepageUrl'
          },
          {
            name: 'id'
          },
          {
            name: 'isArchived'
          },
          {
            name: 'isDisabled'
          },
          {
            name: 'isFork'
          },
          {
            name: 'isLocked'
          },
          {
            name: 'isMirror'
          },
          {
            name: 'isPrivate'
          },
          {
            name: 'isTemplate'
          },
          {
            name: 'issue'
          },
          {
            name: 'issueOrPullRequest'
          },
          {
            name: 'issues'
          },
          {
            name: 'label'
          },
          {
            name: 'labels'
          },
          {
            name: 'languages'
          },
          {
            name: 'licenseInfo'
          },
          {
            name: 'lockReason'
          },
          {
            name: 'mentionableUsers'
          },
          {
            name: 'mergeCommitAllowed'
          },
          {
            name: 'milestone'
          },
          {
            name: 'milestones'
          },
          {
            name: 'mirrorUrl'
          },
          {
            name: 'name'
          },
          {
            name: 'nameWithOwner'
          },
          {
            name: 'object'
          },
          {
            name: 'openGraphImageUrl'
          },
          {
            name: 'owner'
          },
          {
            name: 'parent'
          },
          {
            name: 'primaryLanguage'
          },
          {
            name: 'project'
          },
          {
            name: 'projects'
          },
          {
            name: 'projectsResourcePath'
          },
          {
            name: 'projectsUrl'
          },
          {
            name: 'pullRequest'
          },
          {
            name: 'pullRequests'
          },
          {
            name: 'pushedAt'
          },
          {
            name: 'rebaseMergeAllowed'
          },
          {
            name: 'ref'
          },
          {
            name: 'refs'
          },
          {
            name: 'registryPackages'
          },
          {
            name: 'release'
          },
          {
            name: 'releases'
          },
          {
            name: 'repositoryTopics'
          },
          {
            name: 'resourcePath'
          },
          {
            name: 'shortDescriptionHTML'
          },
          {
            name: 'squashMergeAllowed'
          },
          {
            name: 'sshUrl'
          },
          {
            name: 'stargazers'
          },
          {
            name: 'templateRepository'
          },
          {
            name: 'updatedAt'
          },
          {
            name: 'url'
          },
          {
            name: 'usesCustomOpenGraphImage'
          },
          {
            name: 'viewerCanAdminister'
          },
          {
            name: 'viewerCanCreateProjects'
          },
          {
            name: 'viewerCanSubscribe'
          },
          {
            name: 'viewerCanUpdateTopics'
          },
          {
            name: 'viewerHasStarred'
          },
          {
            name: 'viewerPermission'
          },
          {
            name: 'viewerSubscription'
          },
          {
            name: 'watchers'
          }
        ]
      },
      {
        name: 'Tree',
        kind: 'OBJECT',
        description: 'Represents a Git tree.',
        fields: [
          {
            name: 'abbreviatedOid'
          },
          {
            name: 'commitResourcePath'
          },
          {
            name: 'commitUrl'
          },
          {
            name: 'entries'
          },
          {
            name: 'id'
          },
          {
            name: 'oid'
          },
          {
            name: 'repository'
          }
        ]
      },
      {
        name: 'Blob',
        kind: 'OBJECT',
        description: 'Represents a Git blob.',
        fields: [
          {
            name: 'abbreviatedOid'
          },
          {
            name: 'byteSize'
          },
          {
            name: 'commitResourcePath'
          },
          {
            name: 'commitUrl'
          },
          {
            name: 'id'
          },
          {
            name: 'isBinary'
          },
          {
            name: 'isTruncated'
          },
          {
            name: 'oid'
          },
          {
            name: 'repository'
          },
          {
            name: 'text'
          }
        ]
      }
    ]
  }
};
