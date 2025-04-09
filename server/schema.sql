-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    join_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    location VARCHAR(255),
    company VARCHAR(255),
    bio TEXT,
    password_hash VARCHAR(255) -- For future authentication
);

-- Create disclosures table
CREATE TABLE IF NOT EXISTS disclosures (
    disclosure_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    framework VARCHAR(255),
    disclosure_identifier VARCHAR(255),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    evidence_summary VARCHAR(255),
    disclosure_type VARCHAR(255),
    status VARCHAR(50) CHECK (status IN ('Draft', 'In Progress', 'Completed'))
);

-- Insert sample user data
INSERT INTO users (name, email, location, company, bio) VALUES (
    'Mike Kelvin',
    'mike.kelvin@example.com',
    'Ho Chi Minh City, Vietnam',
    'ESG Analytics Ltd.',
    'ESG Data Analyst with over 5 years of experience in sustainability reporting and environmental impact assessment.'
) ON CONFLICT (email) DO NOTHING;

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(255),
    location VARCHAR(255),
    website VARCHAR(255),
    employee_count INTEGER,
    founded_year INTEGER,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
    portfolio_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create portfolio_companies (join table)
CREATE TABLE IF NOT EXISTS portfolio_companies (
    portfolio_id INTEGER REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
    company_id INTEGER REFERENCES companies(company_id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (portfolio_id, company_id)
);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
    request_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    request_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed', 'Rejected')),
    priority VARCHAR(20) CHECK (priority IN ('Low', 'Medium', 'High')),
    details TEXT,
    requester_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    assigned_to_user_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample disclosure data
WITH user_id AS (SELECT user_id FROM users WHERE email = 'mike.kelvin@example.com')
INSERT INTO disclosures (user_id, company, framework, disclosure_identifier, evidence_summary, disclosure_type, status, last_updated) VALUES
    ((SELECT user_id FROM user_id), 'Funki A/S', 'SASB Toys & Sporting Goods', 'ff', 'No Documents', 'Corporate Disclosure', 'In Progress', '2022-10-31 12:12:00+00'),
    ((SELECT user_id FROM user_id), 'Eco Solutions Inc.', 'GRI Environmental Standards', 'env-123', '2 Documents', 'Environmental Disclosure', 'Completed', '2022-10-28 09:45:00+00'),
    ((SELECT user_id FROM user_id), 'Tech Innovations Ltd', 'SASB Technology', 'tech-456', '1 Document', 'Corporate Disclosure', 'Draft', '2022-10-25 14:30:00+00');

-- Insert sample companies data
INSERT INTO companies (name, industry, location, website, employee_count, founded_year, description) VALUES
    ('Green Energy Solutions', 'Renewable Energy', 'California, USA', 'www.greenenergy.com', 1200, 2010, 'Leading provider of renewable energy solutions'),
    ('EcoTech Manufacturing', 'Manufacturing', 'Michigan, USA', 'www.ecotechmanuf.com', 800, 2005, 'Sustainable manufacturing practices leader'),
    ('Sustainable Foods Co', 'Food & Beverage', 'Oregon, USA', 'www.sustainablefoods.com', 500, 2015, 'Organic and sustainable food production'),
    ('Ocean Care Industries', 'Environmental Services', 'Florida, USA', 'www.oceancare.com', 300, 2018, 'Ocean cleanup and conservation'),
    ('BioTech Innovations', 'Biotechnology', 'Massachusetts, USA', 'www.biotechinnov.com', 650, 2012, 'Developing sustainable biotechnology solutions'),
    ('SolarTech Corp', 'Energy', 'Arizona, USA', 'www.solartech.com', 450, 2014, 'Solar panel manufacturing and installation'),
    ('CleanWater Solutions', 'Water Treatment', 'Texas, USA', 'www.cleanwater.com', 280, 2016, 'Advanced water treatment technologies'),
    ('Green Buildings Inc', 'Construction', 'Washington, USA', 'www.greenbuildings.com', 890, 2008, 'Sustainable building construction'),
    ('WindPower Systems', 'Energy', 'Colorado, USA', 'www.windpower.com', 320, 2015, 'Wind turbine manufacturing'),
    ('Eco Transport', 'Transportation', 'Illinois, USA', 'www.ecotransport.com', 420, 2017, 'Electric vehicle fleet solutions'),
    ('Waste Recovery Ltd', 'Waste Management', 'New York, USA', 'www.wasterecovery.com', 550, 2011, 'Innovative waste management solutions'),
    ('Smart Grid Tech', 'Energy', 'California, USA', 'www.smartgrid.com', 670, 2013, 'Smart grid technology solutions'),
    ('Forest Care Co', 'Conservation', 'Oregon, USA', 'www.forestcare.com', 230, 2018, 'Forest conservation and management'),
    ('Urban Farms', 'Agriculture', 'Minnesota, USA', 'www.urbanfarms.com', 180, 2019, 'Urban farming solutions'),
    ('RecycleTech', 'Recycling', 'Michigan, USA', 'www.recycletech.com', 340, 2016, 'Advanced recycling technologies'),
    ('Clean Air Systems', 'Air Quality', 'California, USA', 'www.cleanair.com', 290, 2017, 'Air quality monitoring and improvement'),
    ('Green Chemistry Labs', 'Chemical', 'New Jersey, USA', 'www.greenchemistry.com', 420, 2014, 'Sustainable chemical processes'),
    ('Eco Packaging', 'Manufacturing', 'Wisconsin, USA', 'www.ecopackaging.com', 380, 2015, 'Sustainable packaging solutions'),
    ('Marine Conservation Inc', 'Conservation', 'Florida, USA', 'www.marineconserv.com', 260, 2016, 'Marine ecosystem conservation')
;

-- Insert sample portfolios data
WITH user_id AS (SELECT user_id FROM users WHERE email = 'mike.kelvin@example.com')
INSERT INTO portfolios (name, description, user_id) VALUES
    ('Renewable Energy Leaders', 'Portfolio of top renewable energy companies', (SELECT user_id FROM user_id)),
    ('Sustainable Manufacturing', 'Companies focused on sustainable manufacturing', (SELECT user_id FROM user_id)),
    ('Ocean Conservation', 'Companies working on ocean conservation', (SELECT user_id FROM user_id)),
    ('Clean Energy Focus', 'Portfolio focused on renewable energy companies', (SELECT user_id FROM user_id)),
    ('Sustainable Transport', 'Companies in sustainable transportation', (SELECT user_id FROM user_id)),
    ('Green Construction', 'Sustainable construction and materials companies', (SELECT user_id FROM user_id)),
    ('Waste Management', 'Companies specializing in waste reduction and recycling', (SELECT user_id FROM user_id)),
    ('Water Technology', 'Water conservation and treatment technologies', (SELECT user_id FROM user_id)),
    ('Eco Agriculture', 'Sustainable farming and agriculture companies', (SELECT user_id FROM user_id)),
    ('Smart Cities', 'Companies working on sustainable urban solutions', (SELECT user_id FROM user_id)),
    ('Conservation Tech', 'Environmental conservation technology companies', (SELECT user_id FROM user_id)),
    ('Green Chemistry', 'Sustainable chemical and materials companies', (SELECT user_id FROM user_id))
;

-- Link companies to portfolios (initial sample data)
WITH sample_links AS (
  SELECT 
    p.portfolio_id,
    c.company_id
  FROM portfolios p
  CROSS JOIN companies c
  WHERE p.name = 'Renewable Energy Leaders' 
  AND c.name IN ('Green Energy Solutions', 'SolarTech Corp', 'WindPower Systems')
)
INSERT INTO portfolio_companies (portfolio_id, company_id)
SELECT portfolio_id, company_id FROM sample_links
ON CONFLICT DO NOTHING;

WITH sample_links AS (
  SELECT 
    p.portfolio_id,
    c.company_id
  FROM portfolios p
  CROSS JOIN companies c
  WHERE p.name = 'Ocean Conservation' 
  AND c.name IN ('Ocean Care Industries', 'Marine Conservation Inc')
)
INSERT INTO portfolio_companies (portfolio_id, company_id)
SELECT portfolio_id, company_id FROM sample_links
ON CONFLICT DO NOTHING;

-- Insert sample requests data
WITH user_id AS (SELECT user_id FROM users WHERE email = 'mike.kelvin@example.com')
INSERT INTO requests (title, request_type, status, priority, details, requester_user_id, assigned_to_user_id) VALUES
    ('New Data Access Request', 'Access Request', 'Pending', 'High', 'Request for access to renewable energy dataset', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('ESG Report Generation', 'Report Request', 'In Progress', 'Medium', 'Generate Q2 2023 ESG report', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Data Verification Request', 'Verification', 'Completed', 'Low', 'Verify latest emissions data', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Carbon Reporting Access', 'Access Request', 'Pending', 'High', 'Need access to carbon reporting module', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Sustainability Report', 'Report Request', 'In Progress', 'Medium', 'Generate Q3 2023 sustainability report', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Data Update Request', 'Update', 'Pending', 'Medium', 'Update company emissions data', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Framework Compliance', 'Verification', 'In Progress', 'High', 'Verify TCFD framework compliance', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('API Integration', 'Technical', 'Completed', 'High', 'Set up API integration for data feeds', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Training Session', 'Training', 'Pending', 'Low', 'Schedule ESG reporting training', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Custom Report Template', 'Development', 'In Progress', 'Medium', 'Create custom report template', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Data Export', 'Export', 'Completed', 'Low', 'Export historical ESG data', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Dashboard Access', 'Access Request', 'Rejected', 'Medium', 'Request for executive dashboard access', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Audit Support', 'Audit', 'In Progress', 'High', 'Support for upcoming ESG audit', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id)),
    ('Metric Calculation', 'Technical', 'Pending', 'Medium', 'Review of emission calculation methodology', (SELECT user_id FROM user_id), (SELECT user_id FROM user_id))
;
