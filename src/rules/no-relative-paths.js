import importType from '../core/importType'
import isStaticRequire from '../core/staticRequire'

function checkForRelativeImportPath(context, node, name) {
  const type = importType(name, context)
  if (type === 'parent' || type === 'sibling') {
    context.report(node, 'Do not import modules using relative path')
  }
}

module.exports = {
  meta: {
    docs: {},
  },

  create: function (context) {
    return {
      ImportDeclaration: function handleImports(node) {
        checkForRelativeImportPath(context, node, node.source.value)
      },
      CallExpression: function handleRequires(node) {
        if (isStaticRequire(node)) {
          checkForRelativeImportPath(context, node, node.arguments[0].value)
        }
      },
    }
  },
}
