desc "Deploy _site/ to Github Pages"
task :deploy do

  url = `git config --get remote.origin.url`.gsub("\n", "")
  tmp_path = "/tmp/_site"
  gh_branch = "gh-pages"

  run "Remove old _site folder", "rm -rf _site"
  run "Generate _site folder", "jekyll build"
  run "Remove old from tmp", "rm -rf #{tmp_path}"
  run "Create new tmp", "mkdir #{tmp_path}"
  run "Git fetch", 'git fetch'

  if `git branch -a`.include?("origin/#{gh_branch}")
    run "Clone remote", "git clone -b #{gh_branch} #{url} #{tmp_path}"
    run "Copy to tmp", "cp -r _site/  #{tmp_path}"
  else
    run "Copy to tmp", "cp -r _site/  #{tmp_path}"
    run "Init git", "git init .", tmp_path
    run "Add remote", "git remote add origin #{url}", tmp_path
    run "Switch to #{gh_branch}", "git checkout -b #{gh_branch}", tmp_path
  end

  run "Remove Rakefile", "rm Rakefile", tmp_path
  run "Git Add", "git add .", tmp_path
  run "Commit", "git commit -m 'Committing a site build at #{Time.now.utc}'", tmp_path
  run "Push", "git push origin gh-pages", tmp_path
end

def run(text, command, path = nil)
  puts "\n## #{text}"
  command_with_path = []
  command_with_path << "cd #{path}" if path
  command_with_path << command
  system command_with_path.join("; ")
end

desc "Start Server"
task :server do
  system "jekyll serve --baseurl ''"
end