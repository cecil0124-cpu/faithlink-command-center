# Production Readiness

FaithLink Command Center is not production-ready for shared team/private data until Firebase Auth and Firestore rules are connected and tested.

## Readiness Checklist

- Authentication enabled.
- Firestore rules tested.
- Admin account created.
- Team roles assigned.
- Prayer data protected.
- Visitor data protected.
- Export backup created.
- Mobile layout checked.
- Print views checked.
- Team View Prep reviewed.
- Firebase billing status reviewed.
- Deployment URL documented.

## Private Data Rule

Do not store real prayer requests, visitor details, pastoral notes, or private member information in a shared deployment until authentication and security rules are active.

## Local-Only Status

The current app is still free-first and localStorage-based. It is useful for planning, demos, workflow building, and safe local testing.
