package com.example.demo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

// CRITICAL: Added the missing Jackson ObjectMapper import


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.hibernate.mapping.Map;

@SpringBootTest
@AutoConfigureMockMvc
class DemoApplicationTests {

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    // This will now correctly reference Jackson's ObjectMapper
    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.webApplicationContext).build();
    }

    @Test
    void createJobWithoutIsActiveShouldSucceed() throws Exception {
        Map<String, Object> payload = Map.of(
                "title", "Senior Backend Engineer",
                "companyName", "Contoso Labs",
                "location", "Remote",
                "jobType", "Full-time",
                "experienceLevel", "Senior",
                "salaryRange", "$140k - $180k",
                "description", "Build scalable APIs and event-driven services.",
                "requirements", "Java, Spring Boot, MySQL",
                "contactEmail", "careers@contoso.com"
        );

        mockMvc.perform(post("/api/jobs")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isCreated());
    }
}
