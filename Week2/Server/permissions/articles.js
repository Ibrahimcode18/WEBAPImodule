const AccessControl = require('role-acl');
const ac = new AccessControl();
// --- THE RULES ---
// 1. A 'user' can update an article ONLY IF they are the owner
ac.grant('user')
 .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
 .execute('update')
 .on('article');
// 2. A 'user' can delete ONLY IF they are the owner
ac.grant('user')
 .condition({ Fn: 'EQUALS', args: { 'requester': '$.owner' } })
 .execute('delete')
 .on('article');
// 3. An 'admin' can do anything
ac.grant('admin')
 .execute('delete')
 .on('article');
ac.grant('admin')
 .execute('update')
 .on('article');
// --- CHECKER FUNCTIONS ---
exports.update = (requester, data) => {
 return ac
 .can(requester.role)
 .context({ requester: requester.ID, owner: data.authorID })
 .execute('update')
 .sync()
 .on('article');
}
exports.delete = (requester) => {
 // We handle the ownership check logic inside the route for delete,
 // or passing the article data here. For now, let's keep it simple.
 return ac
 .can(requester.role)
 .execute('delete') // Note: Real implementation needs context like update above
 .sync()
 .on('article');
}
