export default function (plop) {
  plop.setHelper('sentenceCase', (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  })

  plop.setHelper('snakeCase', (str) => {
    return str
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('_')
  })

  plop.setGenerator('Repositories', {
    description: 'Creating repositories',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Repository name:',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true // return typeNameExist(value) ? "the name already exist!" : true;
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/repositories/In-memory-repository/in-memory-{{ name }}-repository.ts',
        templateFile:
          '_templates/repositories_templates/in-memory_repository.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/Prisma/{{ name }}s/prisma-{{ name }}-repository.ts',
        templateFile:
          '_templates/repositories_templates/prisma_template_repository.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/Prisma/{{ name }}s/{{ name }}-interface.ts',
        templateFile:
          '_templates/repositories_templates/interface_template.hbs',
      },
    ],
  })

  plop.setGenerator('Use Cases', {
    description: 'Creating use cases',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Use case name:',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true // return typeNameExist(value) ? "the name already exist!" : true;
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/use-cases/{{name}}-use-case/create-{{ dashCase name }}-use-case.ts',
        templateFile: '_templates/use-case_templates/use_case_template.hbs',
      },
    ],
  })

  plop.setGenerator('Use Cases Test', {
    description: 'Creating use cases Test',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Use case test name:',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true // return typeNameExist(value) ? "the name already exist!" : true;
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/use-cases/{{name}}-use-case/{{name}}-unity-test/create-{{ dashCase name }}-use-case.spec.ts',
        templateFile:
          '_templates/use-case_test_templates/use_case_test_template.hbs',
      },
    ],
  })

  plop.setGenerator('Use case Factory functions', {
    description: 'Creating use cases factories functions',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Use case factory function name:',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true // return typeNameExist(value) ? "the name already exist!" : true;
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/use-cases/factories/{{name}}-factory-function/make-create-{{ dashCase name }}-factory.ts',
        templateFile: '_templates/factory_templates/factory_template.hbs',
      },
    ],
  })

  plop.setGenerator('Controllers', {
    description: 'Creating controllers',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name:',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true // return typeNameExist(value) ? "the name already exist!" : true;
          }
          return 'name is required'
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/http/controllers/{{name}}/create-{{ dashCase name }}.ts',
        templateFile:
          '_templates/controllers_templates/controllers_template.hbs',
      },
      {
        type: 'add',
        path: 'src/http/controllers/{{name}}/routes.ts',
        templateFile: '_templates/controllers_templates/routes_templates.hbs',
      },
    ],
  })
}
