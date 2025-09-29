README Highlights:
# Phased Renovation Planner

## Purpose
Modular planner for kitchen/bathroom upgrades using prefab and stock components. Optimized for comfort, ROI, and phased implementation.

## Key Concepts
- **Scenario Modeling:** Stress-tested flows for budget, timeline, and emotional resilience
- **Comfort Checkpoints:** Validate user-defined thresholds (e.g., max spend per phase)
- **ROI Benchmarking:** Compare upgrade paths against Ottawa market data
- **Includes User Authentication:** Allows users to sign up for the service
- **Includes Postman & Unit tests:** Tests both controller and api's

## Setup
1. `docker-compose up`
2. `npm run migrate`
3. `npm run test:e2e`

## Extensibility
- Add new prefab types via `server/models/Prefab.ts`
- Extend E2E flows with `client/tests/`
- Document new flows in `docs/README-flow.md`

renovation-planner/
├── client/                  # React front-end
│   ├── components/          # Reusable UI blocks (e.g., CostCalculator, PhaseSelector)
│   ├── pages/               # Route-based views (e.g., /dashboard, /simulate)
│   ├── utils/               # Comfort checkpoints, ROI calculators
│   └── tests/               # Playwright E2E tests
├── server/                  # Node.js + Express back-end
│   ├── routes/              # API endpoints (e.g., /cost, /phases)
│   ├── models/              # DB schemas (e.g., RenovationPlan, UserProfile)
│   ├── services/            # Business logic (e.g., amortization, prefab matching)
│   ├── controllers/         # API Logic, data interaction, request/responses
│   └── tests/               # Unit + integration tests
├── database/                # PostgreSQL setup + seed data
│   └── migrations/
├── docs/                    # README, flow diagrams, ROI benchmarks
├── .env                     # Environment variables
├── docker-compose.yml       # Dev container setup
└── README.md                # Modular documentation



Project Work completed:
expressjs app scaffolded - done
server.js configured
basic get route completed
nodemon implemented
basic logging implemented
postman tests implemented
postman test report implemented
database connection & loggers configured in /config folder
user schema created in /models folder
database connection set up in the /db.js
dotenv populated with JWT secret etc


